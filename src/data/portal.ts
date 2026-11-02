// Where the FCS portal (FremontChineseSchool/portal) publishes the per-class
// "What this year covers" / 本學年課程重點 descriptions. Staff edit them there;
// the site reads them at build time (see course-descriptions.ts).
//
// The key below is the portal's anon/publishable Supabase key. It is public by
// design — it ships in the portal's own frontend bundle, and the function it
// unlocks is a read-only, security-definer view of parent-facing text — so it
// is NOT a secret and is committed on purpose.

export const PORTAL_REST_URL = "https://zpfexpairclfluivejfg.supabase.co/rest/v1";
export const PORTAL_ANON_KEY = "sb_publishable_mG-xN2fcitO2VrgJ8_aHag_S4tNKDcN";
export const COURSE_DESCRIPTIONS_RPC = `${PORTAL_REST_URL}/rpc/public_course_descriptions`;

/**
 * Flip to true when registration opens. While false, /courses hides the
 * "Register in the Portal" callout and doesn't send anyone to the portal.
 */
export const REGISTRATION_OPEN = false;

/** Where parents register and see these same descriptions beside each class. */
export const PORTAL_URL = "https://portal.fremontchineseschool.org";

/**
 * Portal course code -> this site's class code, where the two disagree. The
 * portal calls Pre-K "TPK"; the site (teachers.ts, the class schedule) has
 * always called it "PK". Everything on the site is keyed by the site code.
 */
export const portalToSiteCode: Record<string, string> = { TPK: "PK" };

/** Inverse of `portalToSiteCode`, for the seed export going the other way. */
export const siteToPortalCode: Record<string, string> = Object.fromEntries(
  Object.entries(portalToSiteCode).map(([portal, site]) => [site, portal]),
);
