// Generates public/fcs-calendar-2026-2027.ics from the calendar data.
// Run: node scripts/gen-ics.mjs

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Calendar data (mirrors src/data/calendar.ts) ─────────────────────────────
const entries = [
  // Semester 1
  { date: '2026-08-15', events: [{ text: 'First Day of 1st Semester', type: 'milestone' }] },
  { date: '2026-09-05', events: [{ text: 'No School — Labor Day', type: 'no-school' }] },
  { date: '2026-09-12', events: [{ text: 'Fire Drill', type: 'event' }] },
  { date: '2026-09-26', events: [{ text: 'Picture Day', type: 'event' }] },
  { date: '2026-10-03', events: [
    { text: 'Midterm Exam', type: 'exam' },
    { text: 'All Parent Assembly Notification', type: 'admin' },
    { text: 'Staff Meeting', type: 'admin' },
  ]},
  { date: '2026-10-10', events: [
    { text: 'Street Food Festival', type: 'event' },
    { text: 'Academic Contest Sign-up Starts', type: 'ac' },
  ]},
  { date: '2026-10-24', events: [{ text: 'All Parent Assembly', type: 'event' }] },
  { date: '2026-10-31', events: [{ text: 'Halloween Event', type: 'event' }] },
  { date: '2026-11-07', events: [
    { text: 'Academic Contest Sign-up Ends', type: 'ac' },
    { text: 'AC Makeup Class 1', type: 'ac' },
    { text: 'Staff Meeting', type: 'admin' },
  ]},
  { date: '2026-11-14', events: [{ text: 'Fundraising Food Festival', type: 'event' }] },
  { date: '2026-11-28', events: [{ text: 'No School — Thanksgiving', type: 'no-school' }] },
  { date: '2026-12-05', events: [{ text: 'AC Makeup Class 2', type: 'ac' }] },
  { date: '2026-12-12', events: [
    { text: 'Final Exam', type: 'exam' },
    { text: 'Last Day of 1st Semester', type: 'milestone' },
  ]},
  { date: '2026-12-19', events: [
    { text: 'Academic Contest Day', type: 'ac' },
    { text: 'No Classes — 1st Semester End', type: 'milestone' },
  ]},
  { date: '2026-12-26', events: [{ text: 'No School — Winter Break', type: 'no-school' }] },
  { date: '2027-01-02', events: [{ text: 'No School — Winter Break', type: 'no-school' }] },
  // Semester 2
  { date: '2027-01-09', events: [
    { text: 'First Day of 2nd Semester', type: 'milestone' },
    { text: '1st Semester Report Card', type: 'admin' },
  ]},
  { date: '2027-01-23', events: [{ text: 'Staff Meeting', type: 'admin' }] },
  { date: '2027-01-30', events: [
    { text: 'Lunar New Year Celebration', type: 'event' },
    { text: 'No Elective Classes', type: 'admin' },
  ]},
  { date: '2027-02-06', events: [{ text: 'AC Course Parent Seminar', type: 'ac' }] },
  { date: '2027-02-13', events: [{ text: 'No School — Presidents Day', type: 'no-school' }] },
  { date: '2027-02-20', events: [{ text: 'Open House Day', type: 'event' }] },
  { date: '2027-02-27', events: [{ text: 'AC Placement Test', type: 'ac' }] },
  { date: '2027-03-06', events: [{ text: 'Midterm Exam', type: 'exam' }] },
  { date: '2027-03-13', events: [{ text: 'No School — Spring Break', type: 'no-school' }] },
  { date: '2027-03-20', events: [{ text: 'No School — Spring Break', type: 'no-school' }] },
  { date: '2027-03-27', events: [
    { text: 'AC Makeup Class 1', type: 'ac' },
    { text: 'SY 2027-28 Enrollment Starts', type: 'admin' },
  ]},
  { date: '2027-04-03', events: [{ text: 'Staff Meeting', type: 'admin' }] },
  { date: '2027-04-10', events: [{ text: 'All Parent Assembly Notification', type: 'admin' }] },
  { date: '2027-04-24', events: [{ text: 'All Parent Assembly', type: 'event' }] },
  { date: '2027-05-15', events: [
    { text: 'Final Exam', type: 'exam' },
    { text: 'AC Makeup Class 2', type: 'ac' },
  ]},
  { date: '2027-05-22', events: [
    { text: 'Last Day of the School Year', type: 'milestone' },
    { text: 'Graduation Ceremony', type: 'event' },
    { text: 'Teacher Appreciation Dinner', type: 'event' },
    { text: 'Yearbook Distribution', type: 'event' },
  ]},
];

// ── ICS generation ────────────────────────────────────────────────────────────
function toIcsDate(dateStr) {
  return dateStr.replace(/-/g, '');           // 2026-08-15 → 20260815
}
function nextDay(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}
function escape(text) {
  return text.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

const vevents = [];
for (const entry of entries) {
  for (let i = 0; i < entry.events.length; i++) {
    const ev = entry.events[i];
    const uid = `fcs-${entry.date}-${ev.type}-${i}@fremontchineseschool.org`;
    vevents.push([
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${toIcsDate(entry.date)}`,
      `DTEND;VALUE=DATE:${nextDay(entry.date)}`,
      `SUMMARY:${escape(ev.text)}`,
      `CATEGORIES:${ev.type.toUpperCase()}`,
      `DTSTAMP:${stamp}`,
      `UID:${uid}`,
      'END:VEVENT',
    ].join('\r\n'));
  }
}

const ics = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Fremont Chinese School//School Calendar 2026-2027//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'X-WR-CALNAME:FCS 2026–2027 School Calendar',
  'X-WR-CALDESC:Fremont Chinese School 2026-2027 School Year Calendar',
  'X-WR-TIMEZONE:America/Los_Angeles',
  ...vevents,
  'END:VCALENDAR',
].join('\r\n');

const out = resolve(__dirname, '../public/fcs-calendar-2026-2027.ics');
writeFileSync(out, ics, 'utf8');
console.log(`✓ Written ${vevents.length} events → ${out}`);
