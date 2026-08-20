// The email itself, as a bare HTML document — this is what gets copied into
// Gmail. Rendered from the issue data (src/lib/email.ts) so it cannot drift
// from the web page.
//
// Deployed alongside the issue, which means the person sending the email needs
// only a browser: no repo checkout, no local file. Because public/ is copied
// wholesale at build time, every flyer URL in here resolves as soon as the
// issue is pushed — even while the issue is still a draft. That is what lets
// the email be reviewed at the same time as the page.
import type { APIRoute } from "astro";
import { sortedIssues, issueSlug } from "../../data/newsletters";
import { renderIssueEmail, emailSubject } from "../../lib/email";

export function getStaticPaths() {
  return sortedIssues.map((issue) => ({
    params: { issue: issueSlug(issue) },
    props: { issue },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const issue = (props as any).issue;
  const body = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${emailSubject(issue)}</title>
</head>
<body style="margin:0;padding:0;">
${renderIssueEmail(issue)}
</body>
</html>`;
  return new Response(body, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
