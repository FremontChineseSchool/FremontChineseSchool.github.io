// Machine-readable pointer to the newest PUBLISHED issue's email, for the
// Google Apps Script that sends the weekly eNews (.claude/skills/fcs-weekly-newsletter/assets/enews-sender.gs).
//
// The script runs every Friday at 10:00 Pacific, fetches this file, and sends
// `emailUrl` to the parents list only if `date` is this week's issue and it
// has not already been sent. Drafts never appear here — `latestIssue` is
// drawn from published issues only — so an unapproved issue cannot go out.
//
// This exposes the published issue's email-preview token. That is harmless:
// the email carries exactly the content already public at `webUrl`.
import type { APIRoute } from "astro";
import { latestIssue, emailSlug, issueSlug } from "../../data/newsletters";
import { emailSubject } from "../../lib/email";

const SITE = "https://fremontchineseschool.org";

export const GET: APIRoute = () => {
  const slug = latestIssue && emailSlug(latestIssue);
  const body =
    latestIssue && slug
      ? {
          date: latestIssue.date,
          subject: emailSubject(latestIssue),
          emailUrl: `${SITE}/enews-email/${slug}.raw.html`,
          webUrl: `${SITE}/enews/${issueSlug(latestIssue)}/`,
        }
      : { date: null };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
