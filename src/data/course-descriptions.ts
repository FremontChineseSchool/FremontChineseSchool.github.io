// Build-time loader for the per-class "What this year covers" / 本學年課程重點
// descriptions. The portal (FremontChineseSchool/portal) is the one place staff
// write them; this fetches its public read-only function on every build. If the
// portal can't be reached, falls back to the committed snapshot
// (course-descriptions.snapshot.json, refreshed with `npm run snapshot:courses`)
// so the build never depends on the portal being up.
import { fetchCourseDescriptions } from "./course-descriptions-source";
import type { CourseDescription, CourseDescriptionSet } from "./course-descriptions-source";
import snapshot from "./course-descriptions.snapshot.json";

async function load(): Promise<CourseDescriptionSet> {
  try {
    // PORTAL_COURSES_URL is a test hook: point it at a dead host to see the fallback.
    const set = await fetchCourseDescriptions(process.env.PORTAL_COURSES_URL);
    console.log(`[courses] Loaded ${set.courses.length} courses (${set.schoolYear}) from the portal`);
    return set;
  } catch (err) {
    console.warn(
      `[courses] Could not load the portal feed (${
        err instanceof Error ? err.message : err
      }); using bundled snapshot.`,
    );
    return snapshot as CourseDescriptionSet;
  }
}

const set: CourseDescriptionSet = await load();

export const courseSchoolYear: string = set.schoolYear;
export const courseDescriptions: CourseDescription[] = set.courses;

const byCode = new Map(set.courses.map((c) => [c.code, c]));

/** Lookup by the site's class code (e.g. "K1", "AC2", "P1"). */
export function getCourseDescription(code: string): CourseDescription | undefined {
  return byCode.get(code);
}
export type { CourseDescription, CourseType } from "./course-descriptions-source";
