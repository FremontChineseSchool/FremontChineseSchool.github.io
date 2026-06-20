// Build-time loader for the school calendar.
//
// Fetches the school's public Google Calendar (the single source of truth) as an
// iCal feed, reconstructs the semester grid the table needs, and enriches each
// event with a Chinese name + type from the seed data in calendar.ts. If the
// feed can't be reached, falls back to the bundled snapshot so we never ship an
// empty calendar.
import {
  calendarEntries as fallbackEntries,
  extraEventInfo,
} from "./calendar";
import type { CalendarEntry, CalendarEvent, EventType } from "./calendar";

// Public iCal address of calendar@fremontchineseschool.org (must be shared as
// "See all event details").
const ICS_URL =
  "https://calendar.google.com/calendar/ical/calendar%40fremontchineseschool.org/public/basic.ics";

// English title -> { Chinese name, type }, derived from the seed entries and
// then overlaid with any supplemental entries.
const enrichment: Record<string, { textZh: string; type: EventType }> = {};
for (const entry of fallbackEntries) {
  for (const ev of entry.events) {
    enrichment[ev.text] = { textZh: ev.textZh, type: ev.type };
  }
}
Object.assign(enrichment, extraEventInfo);

// Best-effort type for a title we've never seen (no map entry). Used only for
// genuinely new events; known events always use the seed/extra map above.
function inferType(title: string): EventType {
  const t = title.toLowerCase();
  if (/no school|no class|break|holiday|recess/.test(t)) return "no-school";
  if (/exam|midterm|final|test(?!ing)/.test(t)) return "exam";
  if (/contest|placement|\bac\b|academic/.test(t)) return "ac";
  if (/meeting|notification|report card|enrollment|seminar|assembly notif/.test(t))
    return "admin";
  if (/first day|last day|graduation|semester/.test(t)) return "milestone";
  return "event";
}

function unescapeIcs(s: string): string {
  return s
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

interface RawEvent {
  date: string; // YYYY-MM-DD
  text: string;
}

function parseIcs(ics: string): RawEvent[] {
  // Unfold RFC-5545 continuation lines (a CRLF followed by space/tab), then split.
  const lines = ics.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const events: RawEvent[] = [];
  let cur: Partial<RawEvent> | null = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
    } else if (line === "END:VEVENT") {
      if (cur?.date && cur.text) events.push(cur as RawEvent);
      cur = null;
    } else if (cur) {
      if (line.startsWith("DTSTART")) {
        const m = line.match(/(\d{4})(\d{2})(\d{2})/);
        if (m) cur.date = `${m[1]}-${m[2]}-${m[3]}`;
      } else if (line.startsWith("SUMMARY")) {
        cur.text = unescapeIcs(line.slice(line.indexOf(":") + 1));
      }
    }
  }
  return events;
}

// Every Saturday from `start` to `end` inclusive (dates step by 7 days).
function weeklyGrid(start: string, end: string): string[] {
  const out: string[] = [];
  const d = new Date(start + "T12:00:00");
  const last = new Date(end + "T12:00:00");
  while (d <= last) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 7);
  }
  return out;
}

// Event titles from the feed that have no Chinese name / type in the repo, so
// they render with their English title and a guessed type. The daily
// calendar-check workflow reads this (via the written file) and emails the team.
export const unmappedEvents: { text: string; date: string }[] = [];

function buildEntries(raw: RawEvent[]): CalendarEntry[] {
  if (raw.length === 0) throw new Error("calendar feed contained no events");

  // Group events by date, enriching each with Chinese name + type.
  const byDate = new Map<string, CalendarEvent[]>();
  for (const r of raw) {
    const known = enrichment[r.text];
    if (!known) unmappedEvents.push({ text: r.text, date: r.date });
    const info = known ?? { textZh: r.text, type: inferType(r.text) };
    const list = byDate.get(r.date) ?? [];
    list.push({ text: r.text, textZh: info.textZh, type: info.type });
    byDate.set(r.date, list);
  }

  // Aug–Dec = semester 1, Jan–Jul = semester 2.
  const semesterOf = (date: string): 1 | 2 =>
    Number(date.slice(5, 7)) >= 8 ? 1 : 2;

  const allDates = [...byDate.keys()];
  const result: CalendarEntry[] = [];
  let week = 0; // continuous across both semesters; no-school Saturdays skip a number

  for (const sem of [1, 2] as const) {
    const semDates = allDates.filter((d) => semesterOf(d) === sem).sort();
    if (semDates.length === 0) continue;
    for (const date of weeklyGrid(semDates[0], semDates[semDates.length - 1])) {
      const events = byDate.get(date) ?? [];
      const noSchool = events.some((e) => e.type === "no-school");
      result.push({
        date,
        week: noSchool ? null : ++week,
        sem,
        noSchool: noSchool || undefined,
        events,
      });
    }
  }
  return result;
}

async function load(): Promise<CalendarEntry[]> {
  try {
    const res = await fetch(ICS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const entries = buildEntries(parseIcs(await res.text()));
    console.log(`[calendar] Loaded ${entries.length} weeks from Google Calendar`);
    // In CI, drop the list of events still needing a Chinese name / type so the
    // calendar-check workflow can alert on them. Deduped by title.
    if (process.env.CI) {
      const distinct = [...new Map(unmappedEvents.map((e) => [e.text, e])).values()];
      const { writeFileSync } = await import("node:fs");
      writeFileSync("calendar-unmapped.json", JSON.stringify(distinct, null, 2));
      if (distinct.length) {
        console.warn(`[calendar] ${distinct.length} event(s) need a Chinese name/type: ${distinct.map((e) => e.text).join(", ")}`);
      }
    }
    return entries;
  } catch (err) {
    console.warn(
      `[calendar] Could not load the Google feed (${
        err instanceof Error ? err.message : err
      }); using bundled snapshot.`,
    );
    return fallbackEntries;
  }
}

export const calendarEntries: CalendarEntry[] = await load();
export type { CalendarEntry, CalendarEvent, EventType } from "./calendar";
