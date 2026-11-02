// Fetching + normalising the portal's course descriptions. Shared by the
// build-time loader (course-descriptions.ts) and the `snapshot:courses` script,
// so both see exactly the same shape. No top-level await here on purpose — the
// script wants to call it, not trigger it on import.
import { COURSE_DESCRIPTIONS_RPC, PORTAL_ANON_KEY, portalToSiteCode } from "./portal";

export type CourseType = "chinese" | "ac" | "elective";

export interface CourseDescription {
  /** The SITE's class code (portal "TPK" is mapped to "PK"). */
  code: string;
  /** Portal's English / Chinese names. Display names come from classLabel() instead. */
  name: string;
  chineseName: string;
  courseType: CourseType;
  sortOrder: number;
  /** null = not written in that language (yet). */
  en: string | null;
  zh: string | null;
}

export interface CourseDescriptionSet {
  schoolYear: string;
  courses: CourseDescription[];
}

interface RawRow {
  school_year: string;
  code: string;
  name: string;
  chinese_name: string;
  course_type: CourseType;
  sort_order: number;
  description_en: string | null;
  description_zh: string | null;
}

const clean = (s: string | null | undefined) => s?.trim() || null;

export function normalize(rows: RawRow[]): CourseDescriptionSet {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("portal returned no courses");
  }
  // A course with two sections comes back as two rows; keep one per code, and
  // prefer the row that actually has text if the sections disagree.
  const byCode = new Map<string, CourseDescription>();
  for (const r of rows) {
    const code = portalToSiteCode[r.code] ?? r.code;
    const next: CourseDescription = {
      code,
      name: r.name,
      chineseName: r.chinese_name,
      courseType: r.course_type,
      sortOrder: r.sort_order,
      en: clean(r.description_en),
      zh: clean(r.description_zh),
    };
    const prev = byCode.get(code);
    if (!prev) byCode.set(code, next);
    else {
      prev.en ??= next.en;
      prev.zh ??= next.zh;
    }
  }
  return {
    schoolYear: rows[0].school_year,
    courses: [...byCode.values()].sort((a, b) => a.sortOrder - b.sortOrder || a.code.localeCompare(b.code)),
  };
}

/** `schoolYear` omitted = the portal's newest registration-open year. */
export async function fetchCourseDescriptions(
  url: string = COURSE_DESCRIPTIONS_RPC,
  schoolYear?: string,
): Promise<CourseDescriptionSet> {
  const res = await fetch(url, {
    method: "POST",
    headers: { apikey: PORTAL_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(schoolYear ? { p_school_year_code: schoolYear } : {}),
    // A hung portal must not hang the build; the snapshot is right there.
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return normalize((await res.json()) as RawRow[]);
}
