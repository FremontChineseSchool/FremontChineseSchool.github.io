// Minimal inline markup for eNews copy.
//
// The school writes links and emphasis INSIDE sentences — "詳情請上官網：
// [官網](https://www.anccs.org)", "starting this week, **all staff will need a
// placard**". Storing those as plain strings meant every inline link had to be
// demoted to the link row at the foot of a section, which changes how the
// sentence reads. So issue copy supports exactly two constructs and nothing
// else:
//
//   [label](https://example.com)   ->  <a href="…">label</a>
//   **emphasis**                   ->  <strong>emphasis</strong>
//
// Deliberately NOT a markdown parser. No headings, images, lists, or raw HTML —
// those are block-level concerns and belong in the `blocks` array where they can
// be styled consistently. Keeping the grammar this small is what stops issue
// copy from drifting into hand-written markup.

/** Escape first, so authored text can never inject markup. */
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sentinel href for a link whose target is not known yet — most often because
 * the source was a screenshot, which shows that text is a link but not where it
 * points. Write `[First Day Photo Album](TODO)`, or `(TODO: ask Angela)` to
 * carry a note. It renders as a loud marker rather than a broken link, is
 * listed on the draft page, and BLOCKS publication (see collectGaps in
 * src/data/newsletters.ts).
 *
 * The point is that a missing URL cannot be quietly forgotten: guessing one is
 * worse than shipping an obvious hole, because a plausible wrong link gets
 * clicked.
 */
export const GAP = "TODO";

/** True when an href is the gap sentinel rather than a real target. */
export function isGapHref(href: string): boolean {
  return href === GAP || href.startsWith(GAP + ":");
}

/** In-site paths navigate normally; anything external opens in a new tab. */
function anchorAttrs(href: string): string {
  const external = /^https?:\/\//i.test(href);
  return external ? ' target="_blank" rel="noopener"' : "";
}

/**
 * Render one string of issue copy to HTML. The result is used with `set:html`,
 * so escaping happens before any substitution — an authored `<script>` becomes
 * visible text, not markup.
 */
export function renderInline(
  text: string,
  opts: { draft?: boolean } = {},
): string {
  let out = escapeHtml(text);

  // [label](href) — href is restricted to http(s), mailto, and site-absolute
  // paths. Anything else (javascript:, data:) is left as literal text rather
  // than silently dropped, so a mistake is visible in review.
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (whole, label: string, href: string) => {
      if (isGapHref(href)) {
        // Loud on a draft, where the reviewer needs to see the hole. On a
        // published page — only reachable via an explicit publishWithGaps
        // override — it degrades to the plain label: a reader gets a sentence
        // that reads normally instead of an internal marker aimed at staff.
        if (!opts.draft) return label;
        const note = href.slice(GAP.length).replace(/^:\s*/, "");
        return (
          `<span class="enews-gap">${label}` +
          `<span class="enews-gap-tag">link missing${note ? ` — ${note}` : ""}</span>` +
          `</span>`
        );
      }
      const safe = /^(https?:\/\/|mailto:|\/)/i.test(href);
      return safe ? `<a href="${href}"${anchorAttrs(href)}>${label}</a>` : whole;
    },
  );

  // **emphasis**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return out;
}

/**
 * True when a string still contains markup that renderInline does not handle —
 * a stray `**` from a source email whose own editor failed to render it, for
 * instance. Used by the build check below.
 */
export function hasUnrenderedMarkup(text: string): boolean {
  const stripped = text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
  return stripped.includes("**") || /\]\(/.test(stripped);
}
