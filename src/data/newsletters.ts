// Weekly eNews issues — the source of truth for /enews and /zh/enews.
//
// Written by the `fcs-weekly-newsletter` skill (.claude/skills/), which the
// principal runs each week. Adding an issue is the ONLY edit a normal week
// needs: prepend an object to `issues` below, drop any flyer images into
// public/images/news/, and run `npm run build`. No new route files, no slug
// table entry, no meta-description entry — the routes and the archive are
// generated from this array.
//
// Unlike most page copy — which lives in src/i18n/content.ts split into
// `content.en` / `content.zh` — each issue here carries BOTH locales inline,
// the same shape calendar.ts and teachers.ts use, and for the same reason:
// keeping a week's Chinese and English adjacent is what stops the two from
// drifting. Here the type also *enforces* it — `Localized` requires both keys,
// so a half-translated issue is a build error rather than a silent gap.
// Page-level chrome (the page title, archive labels) still lives in content.ts
// under `enews`.
//
// Issue dates are the SEND date, which is normally the Thursday or Friday
// before the Saturday the issue is about — so consecutive issues are not
// reliably 7 days apart. Nothing here assumes a weekly cadence; `date` is just
// a unique sort key and slug.
//
// The email version of the same issue is a separate artifact: a standalone
// email-safe HTML file the skill renders from
// .claude/skills/fcs-weekly-newsletter/assets/email-template.html for pasting
// into the parent-email send. It is intentionally NOT generated from this file
// — email needs table layout and inline styles that have nothing to do with
// the site's CSS. The skill fills both from the same gathered content in one
// pass; if they ever drift, this file is the one that's canonical.
//
// Flyer images: commit them to public/images/news/ so the SITE hosts them.
// That is what makes them usable in the email too — email clients need an
// absolute, publicly reachable URL, and once an issue is deployed the flyer
// lives at https://fremontchineseschool.org/images/news/<file>. Publish the
// web page first, then send the email. Recurring, non-issue-specific art
// (sponsor logos) lives in public/images/sponsors/ instead, undated, because
// the same file is reused across issues.

/** A string that must exist in both locales. Missing one is a type error. */
export type Localized = { en: string; zh: string };

/** A link whose label is translated but whose target is shared. */
export type LocalizedLink = { label: Localized; href: string };

/**
 * Image fields, available on most section kinds — a campus map above the
 * first-day notes, a team photo above the volunteer call, or the flyer that IS
 * the section. `alt` is mandatory whenever `image` is set: the union makes an
 * undescribed image a build error, the same way `Localized` makes a missing
 * translation one.
 */
type ImageFields =
  | { image: string; alt: Localized; caption?: Localized }
  | { image?: undefined; alt?: undefined; caption?: undefined };

/**
 * Shared by every section. `links` renders as a row of underlined links below
 * the body — use it for downloads and supporting documents, and use a `cta`
 * (callout only) for the one action the section is actually asking for.
 */
type SectionBase = { title: Localized; links?: LocalizedLink[] };

/**
 * One block of an issue. Sections render in array order, so the array IS the
 * running order of the page. Every kind is optional and repeatable — a quiet
 * week might be a single `note`; a busy one might carry four `flyer`s.
 *
 * Every kind renders in the same order: title, image + caption, body, links,
 * then cta. If a week needs a shape none of these covers, add a kind here and
 * a branch in NewsletterIssuePage.astro — never smuggle markup into a string.
 */
export type IssueSection =
  /** Prose. The principal's note, or any narrative block. */
  | (SectionBase &
      ImageFields & {
        kind: "note";
        /** One entry per paragraph. */
        paragraphs: Localized[];
        /** e.g. "Warmly, Angela Ha, Principal" — rendered in a lighter style. */
        signoff?: Localized;
      })
  /** A list — dates, deadlines, logistics. */
  | (SectionBase &
      ImageFields & {
        kind: "bullets";
        intro?: Localized;
        items: Localized[];
      })
  /**
   * A pre-made flyer graphic (usually Canva). The same image is used in both
   * locales and in the email — only title, alt, and caption are translated.
   * `image` and `alt` are required here, since the graphic IS the section.
   */
  | (SectionBase & {
      kind: "flyer";
      /** Site-absolute path, e.g. "/images/news/enews-2026-08-14-flyer.jpg". */
      image: string;
      /**
       * Alt text. Flyers carry their own words, so describe the flyer's
       * PURPOSE for a screen reader rather than restating the title.
       */
      alt: Localized;
      /**
       * Put the flyer's key facts here as real text — times, room numbers,
       * join codes. Text baked into a graphic is invisible to screen readers,
       * to site search, and to anyone who blocks images.
       */
      caption?: Localized;
    })
  /** A highlighted block with an optional button — volunteer calls, donations. */
  | (SectionBase &
      ImageFields & {
        kind: "callout";
        paragraphs: Localized[];
        cta?: LocalizedLink;
      })
  /** Sponsor logos. Conditional — only on weeks with a sponsor update. */
  | (SectionBase & {
      kind: "sponsors";
      logos: { name: string; image: string; href?: string }[];
    });

export type NewsletterIssue = {
  /**
   * Issue date, ISO `YYYY-MM-DD`. Doubles as the URL slug
   * (/enews/2026-08-14/) and as the sort key, so it must be unique.
   */
  date: string;
  /** Human-readable date for display. */
  label: Localized;
  /**
   * One sentence, ~120–160 chars: used as the page's meta description and as
   * the blurb in the archive list. Lead with what's actually in the issue.
   */
  summary: Localized;
  /**
   * Set `draft: true` to stage an issue for review WITHOUT announcing it.
   *
   * A draft is built at its own permalink — /enews/<date>/ and
   * /zh/enews/<date>/ — so the URL can be shared with staff, and it renders on
   * the real site rather than someone's laptop. But it is excluded from /enews/
   * (which keeps showing the previous issue), from the archive, from the footer
   * link, from the sitemap, and it carries a `noindex` so search engines skip
   * it. The page itself shows a "draft" banner so no reviewer mistakes it for
   * published.
   *
   * Delete the flag (don't set it to false) when the issue is approved, and
   * push again. That is the moment it becomes the current issue.
   */
  draft?: boolean;
  sections: IssueSection[];
};

/**
 * Issues, newest first. Prepend new ones.
 *
 * While this is empty NO eNews pages are generated at all — /enews/ and
 * /enews/archive/ simply do not exist, rather than existing as empty shells.
 * The footer link is likewise suppressed until the first issue lands (see
 * Footer.astro). The first real issue turns the whole section on.
 */
export const issues: NewsletterIssue[] = [];

/**
 * Every issue, drafts included, newest first. Only the route generator needs
 * this — it builds a permalink for drafts too. Everything reader-facing should
 * use `publishedIssues` so a draft never leaks into a listing.
 */
export const sortedIssues: NewsletterIssue[] = [...issues].sort((a, b) =>
  b.date.localeCompare(a.date),
);

/** Approved issues only, newest first. */
export const publishedIssues: NewsletterIssue[] = sortedIssues.filter(
  (i) => !i.draft,
);

/** The issue /enews/ shows. `undefined` until something is published. */
export const latestIssue: NewsletterIssue | undefined = publishedIssues[0];

/**
 * True once at least one issue is PUBLISHED — gates the footer link and the
 * /news card. A repo holding nothing but drafts still shows no eNews section.
 */
export const hasIssues = publishedIssues.length > 0;

/** Look up one issue by its date slug. Finds drafts too. */
export function findIssue(date: string): NewsletterIssue | undefined {
  return sortedIssues.find((i) => i.date === date);
}

/**
 * Neighbours of an issue in publication order, for the prev/next footer.
 * `newer`/`older` rather than prev/next — less ambiguous on a dated archive.
 * Walks published issues only, so a draft is never linked from a live page and
 * has no neighbours of its own.
 */
export function issueNeighbours(date: string): {
  newer?: NewsletterIssue;
  older?: NewsletterIssue;
} {
  const i = publishedIssues.findIndex((x) => x.date === date);
  if (i === -1) return {};
  return { newer: publishedIssues[i - 1], older: publishedIssues[i + 1] };
}
