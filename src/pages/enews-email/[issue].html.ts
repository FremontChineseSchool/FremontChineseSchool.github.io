// Review wrapper around the email. Shows the send instructions, the subject
// line, and any unresolved gaps — then the email itself in an iframe.
//
// The iframe is the point: clicking inside it and pressing ⌘A selects ONLY the
// email, so the reviewer's copy never picks up this page's own chrome. A banner
// sitting above a bare table would be swept into the same select-all.
import type { APIRoute } from "astro";
import {
  sortedIssues,
  issueSlug,
  collectGaps,
  type NewsletterIssue,
} from "../../data/newsletters";
import { emailSubject } from "../../lib/email";

export function getStaticPaths() {
  return sortedIssues.map((issue) => ({
    params: { issue: issueSlug(issue) },
    props: { issue },
  }));
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = ({ params, props }) => {
  const issue = (props as any).issue as NewsletterIssue;
  const slug = issueSlug(issue);
  const gaps = collectGaps(issue);
  const subject = emailSubject(issue);

  const gapPanel = gaps.length
    ? `<div class="warn"><strong>⚠ ${gaps.length} unresolved item(s) — do not send yet</strong><ul>${gaps
        .map((g) => `<li>${esc(g)}</li>`)
        .join("")}</ul></div>`
    : "";

  const draftPanel = issue.draft
    ? `<div class="warn"><strong>This is a DRAFT.</strong> The "Read on the web" link points at the
       review URL, which stops working once the issue is published. Regenerate this page after
       publishing — it rebuilds automatically — and send that copy.</div>`
    : "";

  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Email preview — ${esc(subject)}</title>
<style>
  /* Chrome only. user-select:none keeps it out of a stray select-all, and the
     email lives in an iframe so ⌘A inside it stays inside it. */
  body { margin:0; background:#F7F3E9; font:14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; color:#221F1A; }
  .chrome { -webkit-user-select:none; user-select:none; max-width:760px; margin:0 auto; padding:24px 20px 8px; }
  h1 { font-size:18px; margin:0 0 4px; }
  .muted { color:#57534A; }
  .subject { background:#fff; border:1px solid #D9D0C0; border-radius:6px; padding:10px 12px; margin:12px 0; font-family:ui-monospace,monospace; -webkit-user-select:all; user-select:all; }
  .warn { background:#FDECEA; border:2px solid #B3261E; color:#7F1D1B; border-radius:8px; padding:12px 14px; margin:12px 0; }
  .warn ul { margin:8px 0 0; padding-left:20px; }
  ol { padding-left:22px; }
  iframe { display:block; width:100%; max-width:760px; margin:0 auto 40px; height:90vh; border:1px solid #D9D0C0; border-radius:8px; background:#fff; }
</style>
</head>
<body>
<div class="chrome">
  <h1>Email preview — ${esc(issue.label.en)}</h1>
  <p class="muted">Rendered from the same data as the web page, so the two cannot drift.</p>
  ${draftPanel}
  ${gapPanel}
  <p><strong>Subject line</strong> (click to select):</p>
  <div class="subject">${esc(subject)}</div>
  <ol>
    <li><strong>Click inside the email below</strong>, then press <strong>⌘A</strong> then <strong>⌘C</strong>.</li>
    <li>In Gmail click <strong>Compose</strong>, then <strong>⌘V</strong>. Layout, colours and images all come across.</li>
    <li><strong>Send a test to yourself first</strong> — check it on a phone as well as a computer.</li>
    <li>If it looks right, send it to the parents list.</li>
  </ol>
  <p class="muted">If images don't survive the paste, drag the files from
     <code>public/images/news/</code> into the compose window instead — that attaches them,
     which always displays. Bare copy, no wrapper:
     <a href="/enews-email/${slug}.raw.html">${slug}.raw.html</a></p>
</div>
<iframe src="/enews-email/${slug}.raw.html" title="Email preview"></iframe>
</body>
</html>`;
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};
