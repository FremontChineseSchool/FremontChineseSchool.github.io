// School calendar seed data.
//
// The live calendar is now maintained by the school in Google Calendar
// (calendar@fremontchineseschool.org). At build time, calendar-feed.ts fetches
// that public feed and renders the table from it. This file plays two roles:
//
//   1. Enrichment: the Google feed only carries an English title + date, so we
//      map each English title -> { Chinese name, type } using the events below
//      (plus `extraEventInfo` for titles not present here).
//   2. Fallback: if the Google feed is unreachable at build time, the site
//      renders these entries instead of shipping an empty calendar.
//
// So you normally edit the calendar in Google, NOT here. Touch this file only to
// add a Chinese name / type for a brand-new event title (see `extraEventInfo`).

export type EventType = 'milestone' | 'no-school' | 'event' | 'ac' | 'exam' | 'admin';

export interface CalendarEvent {
  text: string;
  textZh: string;
  type: EventType;
}

export interface CalendarEntry {
  date: string;      // YYYY-MM-DD (always a Saturday unless holiday)
  week: number | null; // null = no-school date (no week count)
  sem: 1 | 2;
  noSchool?: boolean;
  events: CalendarEvent[];
}

// Chinese name + type for event titles that are NOT in the seed entries below
// (e.g. a new event the school adds in Google Calendar). Key = exact English
// title as typed in Google Calendar. Without an entry here, a new event still
// shows up — with its English title and a keyword-guessed type/color.
export const extraEventInfo: Record<string, { textZh: string; type: EventType }> = {
  // 'New Event Title': { textZh: '中文名稱', type: 'event' },
};

export const calendarEntries: CalendarEntry[] = [
  // ── Semester 1 ──────────────────────────────────────────────────────────────
  { date: '2026-08-15', week: 1,    sem: 1, events: [{ text: 'First Day of 1st Semester', textZh: '第一學期開學日', type: 'milestone' }] },
  { date: '2026-08-22', week: 2,    sem: 1, events: [] },
  { date: '2026-08-29', week: 3,    sem: 1, events: [] },
  { date: '2026-09-05', week: null, sem: 1, noSchool: true, events: [{ text: 'No School — Labor Day', textZh: '不上課——勞工節', type: 'no-school' }] },
  { date: '2026-09-12', week: 4,    sem: 1, events: [{ text: 'Fire Drill', textZh: '消防演練', type: 'event' }] },
  { date: '2026-09-19', week: 5,    sem: 1, events: [] },
  { date: '2026-09-26', week: 6,    sem: 1, events: [{ text: 'Picture Day', textZh: '照相日', type: 'event' }] },
  { date: '2026-10-03', week: 7,    sem: 1, events: [
    { text: 'Midterm Exam', textZh: '期中考', type: 'exam' },
    { text: 'All Parent Assembly Notification', textZh: '家長大會通知', type: 'admin' },
    { text: 'Staff Meeting', textZh: '教職員會議', type: 'admin' },
  ]},
  { date: '2026-10-10', week: 8,    sem: 1, events: [
    { text: 'Street Food Festival', textZh: '小吃義賣', type: 'event' },
    { text: 'Academic Contest Sign-up Starts', textZh: '學術比賽報名開始', type: 'ac' },
  ]},
  { date: '2026-10-17', week: 9,    sem: 1, events: [] },
  { date: '2026-10-24', week: 10,   sem: 1, events: [{ text: 'All Parent Assembly', textZh: '家長大會', type: 'event' }] },
  { date: '2026-10-31', week: 11,   sem: 1, events: [{ text: 'Halloween Event', textZh: '萬聖節活動', type: 'event' }] },
  { date: '2026-11-07', week: 12,   sem: 1, events: [
    { text: 'Academic Contest Sign-up Ends', textZh: '學術比賽報名截止', type: 'ac' },
    { text: 'AC Makeup Class 1', textZh: '學分班補課一', type: 'ac' },
    { text: 'Staff Meeting', textZh: '教職員會議', type: 'admin' },
  ]},
  { date: '2026-11-14', week: 13,   sem: 1, events: [{ text: 'Fundraising Food Festival', textZh: '募款小吃義賣', type: 'event' }] },
  { date: '2026-11-21', week: 14,   sem: 1, events: [] },
  { date: '2026-11-28', week: null, sem: 1, noSchool: true, events: [{ text: 'No School — Thanksgiving', textZh: '不上課——感恩節', type: 'no-school' }] },
  { date: '2026-12-05', week: 15,   sem: 1, events: [{ text: 'AC Makeup Class 2', textZh: '學分班補課二', type: 'ac' }] },
  { date: '2026-12-12', week: 16,   sem: 1, events: [
    { text: 'Final Exam', textZh: '期末考', type: 'exam' },
    { text: 'Last Day of 1st Semester', textZh: '第一學期最後一天', type: 'milestone' },
  ]},
  { date: '2026-12-19', week: 17,   sem: 1, events: [
    { text: 'Academic Contest Day', textZh: '學術比賽日', type: 'ac' },
    { text: 'No Classes — 1st Semester End', textZh: '不上課——第一學期結束', type: 'milestone' },
  ]},
  { date: '2026-12-26', week: null, sem: 1, noSchool: true, events: [{ text: 'No School — Winter Break', textZh: '不上課——寒假', type: 'no-school' }] },
  { date: '2027-01-02', week: null, sem: 1, noSchool: true, events: [{ text: 'No School — Winter Break', textZh: '不上課——寒假', type: 'no-school' }] },

  // ── Semester 2 ──────────────────────────────────────────────────────────────
  { date: '2027-01-09', week: 18,   sem: 2, events: [
    { text: 'First Day of 2nd Semester', textZh: '第二學期開學日', type: 'milestone' },
    { text: '1st Semester Report Card', textZh: '第一學期成績單', type: 'admin' },
  ]},
  { date: '2027-01-16', week: 19,   sem: 2, events: [] },
  { date: '2027-01-23', week: 20,   sem: 2, events: [{ text: 'Staff Meeting', textZh: '教職員會議', type: 'admin' }] },
  { date: '2027-01-30', week: 21,   sem: 2, events: [
    { text: 'Lunar New Year Celebration', textZh: '新春聯歡會', type: 'event' },
    { text: 'No Elective Classes', textZh: '選修課停課', type: 'admin' },
  ]},
  { date: '2027-02-06', week: 22,   sem: 2, events: [{ text: 'AC Course Parent Seminar', textZh: '學分班家長說明會', type: 'ac' }] },
  { date: '2027-02-13', week: null, sem: 2, noSchool: true, events: [{ text: "No School — Presidents Day", textZh: '不上課——總統日', type: 'no-school' }] },
  { date: '2027-02-20', week: 23,   sem: 2, events: [{ text: 'Open House Day', textZh: '開放參觀日', type: 'event' }] },
  { date: '2027-02-27', week: 24,   sem: 2, events: [{ text: 'AC Placement Test', textZh: '學分班分班考試', type: 'ac' }] },
  { date: '2027-03-06', week: 25,   sem: 2, events: [{ text: 'Midterm Exam', textZh: '期中考', type: 'exam' }] },
  { date: '2027-03-13', week: null, sem: 2, noSchool: true, events: [{ text: 'No School — Spring Break', textZh: '不上課——春假', type: 'no-school' }] },
  { date: '2027-03-20', week: null, sem: 2, noSchool: true, events: [{ text: 'No School — Spring Break', textZh: '不上課——春假', type: 'no-school' }] },
  { date: '2027-03-27', week: 26,   sem: 2, events: [
    { text: 'AC Makeup Class 1', textZh: '學分班補課一', type: 'ac' },
    { text: 'SY 2027-28 Enrollment Starts', textZh: '2027-28 學年報名開始', type: 'admin' },
  ]},
  { date: '2027-04-03', week: 27,   sem: 2, events: [{ text: 'Staff Meeting', textZh: '教職員會議', type: 'admin' }] },
  { date: '2027-04-10', week: 28,   sem: 2, events: [{ text: 'All Parent Assembly Notification', textZh: '家長大會通知', type: 'admin' }] },
  { date: '2027-04-17', week: 29,   sem: 2, events: [] },
  { date: '2027-04-24', week: 30,   sem: 2, events: [{ text: 'All Parent Assembly', textZh: '家長大會', type: 'event' }] },
  { date: '2027-05-01', week: 31,   sem: 2, events: [] },
  { date: '2027-05-08', week: 32,   sem: 2, events: [] },
  { date: '2027-05-15', week: 33,   sem: 2, events: [
    { text: 'Final Exam', textZh: '期末考', type: 'exam' },
    { text: 'AC Makeup Class 2', textZh: '學分班補課二', type: 'ac' },
  ]},
  { date: '2027-05-22', week: 34,   sem: 2, events: [
    { text: 'Last Day of the School Year', textZh: '本學年最後一天', type: 'milestone' },
    { text: 'Graduation Ceremony', textZh: '畢業典禮', type: 'event' },
    { text: 'Teacher Appreciation Dinner', textZh: '教師感謝晚宴', type: 'event' },
    { text: 'Yearbook Distribution', textZh: '發放年刊', type: 'event' },
  ]},
];
