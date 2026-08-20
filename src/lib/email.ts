// Renders an eNews issue as email-safe HTML, from the same data that builds the
// web page — so the two artifacts cannot drift. Replaces the hand-filled
// template that used to live in the skill's assets/.
//
// EVERY RULE HERE IS DELIBERATE. Do not "modernise" this file:
//  1. No <style> block, no classes. Every style is inline, because Gmail and
//     Outlook strip <style> and most modern CSS.
//  2. Nested <table> for layout, never <div>/flexbox.
//  3. Max width 600px.
//  4. Web-safe font stack only. Chinese relies on the recipient's system font;
//     the site's Noto Serif TC / Inter do not load in mail clients.
//  5. Buttons are <a> styled inline, not <button>.
//  6. Absolute image URLs. Relative paths do not resolve in a mail client.
//  7. Both languages stacked — Chinese then English — with "skip to English"
//     jump links. Outlook desktop ignores in-mail anchors; that is a known,
//     accepted gap, not a bug. Never hide a language with CSS.
//  8. Colours are the site's Jade & Gold tokens, hardcoded because email
//     cannot read CSS variables. Gold is a FILL; text on gold is ink
//     (#221F1A), never white — white on #D8A832 fails contrast.
import type { Block, IssueSection, NewsletterIssue } from "../data/newsletters";
import { GAP, isGapHref } from "./inline";
import { issueSlug } from "../data/newsletters";

const SITE = "https://fremontchineseschool.org";

const C = {
  jadeDeep: "#0E5038",
  jade: "#1A6E52",
  paper: "#ECE6D6",
  goldTint: "#F6ECCF",
  gold: "#D8A832",
  ink: "#221F1A",
  inkSoft: "#57534A",
  gapBg: "#FDECEA",
  gapInk: "#7F1D1B",
} as const;

const FONT = "Arial,'PingFang TC','Microsoft JhengHei',sans-serif";

/** Evergreen email-only content. Not in the issue data because it never
 *  changes, and not on the website because the footer already carries it. */
const FOLLOW_US = {
  title: "追蹤我們，探索新網站 / Follow Us & Explore Our New Website",
  zh: "想看更多校園活動花絮、精彩瞬間嗎？追蹤費利蒙中文學校的社群媒體，第一時間掌握最新消息，也歡迎分享給親朋好友！",
  en: "Want more behind-the-scenes moments and event highlights? Follow Fremont Chinese School on social media for the latest news, and don't forget to share with friends and family!",
};
const WASC =
  "費利蒙中文學校高中中文學分班：獲得西部學校與學院協會 (WASC) 學校認證委員會認證。";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Absolute-ise a site path; leave full URLs and mailto: alone. */
function abs(href: string): string {
  return href.startsWith("/") ? SITE + href : href;
}

/**
 * The inline grammar from src/lib/inline.ts, rendered for email: anchors carry
 * inline colour instead of a class, and a `TODO` marker becomes a visible
 * bracketed note. Gap markers only appear on a review copy — an issue with open
 * gaps cannot be published, and the email is only sent after publication.
 */
function inlineEmail(text: string): string {
  let out = esc(text);
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (whole, label: string, href: string) => {
    if (isGapHref(href)) {
      const note = href.slice(GAP.length).replace(/^:\s*/, "");
      return `<span style="background:${C.gapBg};color:${C.gapInk};font-weight:bold;">${label} [LINK MISSING${note ? ` — ${esc(note)}` : ""}]</span>`;
    }
    if (!/^(https?:\/\/|mailto:|\/)/i.test(href)) return whole;
    return `<a href="${abs(href)}" style="color:${C.jadeDeep};">${label}</a>`;
  });
  return out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

const P = `margin:0 0 12px;font-size:14px;line-height:1.7;color:${C.ink};`;

/** One locale's worth of a section's blocks. */
function blocksHtml(blocks: Block[], lang: "en" | "zh", numbered: boolean): string {
  let n = 0;
  return blocks
    .map((b) => {
      if (b.block === "subhead") {
        n += 1;
        const prefix = numbered ? `${n}. ` : "";
        return `<p style="margin:16px 0 8px;font-size:14px;font-weight:bold;color:${C.ink};">${prefix}${inlineEmail(b.text[lang])}</p>`;
      }
      if (b.block === "prose") {
        return `<p style="${P}">${inlineEmail(b.text[lang])}</p>`;
      }
      if (b.block === "list") {
        const tag = b.ordered ? "ol" : "ul";
        const items = b.items
          .map((i) => `<li style="margin:0 0 6px;">${inlineEmail(i[lang])}</li>`)
          .join("");
        return `<${tag} style="margin:0 0 12px;padding-left:20px;font-size:14px;line-height:1.7;color:${C.ink};">${items}</${tag}>`;
      }
      // Images are shared between locales — emitted once, with the Chinese
      // block, so the picture is not duplicated in the stacked document.
      if (b.block === "image" && lang === "zh") {
        const cap = b.caption
          ? `<p style="margin:8px 0 12px;font-size:13px;line-height:1.6;color:${C.inkSoft};">${inlineEmail(b.caption.zh)}<br>${inlineEmail(b.caption.en)}</p>`
          : "";
        return `<img src="${abs(b.src)}" width="560" alt="${esc(b.alt.en)}" style="display:block;width:100%;max-width:560px;height:auto;border-radius:6px;margin:0 0 8px;">${cap}`;
      }
      return "";
    })
    .join("\n");
}

function linksRow(section: IssueSection): string {
  if (!section.links?.length) return "";
  const items = section.links
    .map(
      (l) =>
        `<a href="${abs(l.href)}" style="color:${C.jadeDeep};">${inlineEmail(l.label.zh)} / ${inlineEmail(l.label.en)}</a>`,
    )
    .join(" &nbsp;·&nbsp; ");
  return `<p style="margin:4px 0 12px;font-size:13px;line-height:1.7;">${items}</p>`;
}

function ctaButton(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:10px auto 4px;"><tr><td align="center" bgcolor="${C.gold}" style="border-radius:999px;"><a href="${abs(href)}" style="display:inline-block;padding:10px 22px;font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:${C.ink};text-decoration:none;">${label}</a></td></tr></table>`;
}

function heading(title: string, anchor?: string): string {
  const skip = anchor
    ? `<div style="font-size:11px;text-align:center;margin-bottom:8px;"><a href="#${anchor}" style="color:${C.jadeDeep};">跳到英文 Skip to English ↓</a></div>`
    : "";
  return `<h2 style="color:${C.jadeDeep};font-size:16px;text-align:center;border-bottom:2px solid ${C.jade};padding-bottom:6px;margin:28px 0 14px;">${title}</h2>${skip}`;
}

function row(inner: string, align = "left"): string {
  return `<tr><td align="${align}" style="font-family:${FONT};">${inner}</td></tr>`;
}

function sectionHtml(section: IssueSection, i: number): string {
  const title = `${section.title.zh} / ${section.title.en}`;
  const anchor = `sec${i}-en`;

  if (section.kind === "sponsors") {
    const cells = section.logos
      .map((l) => {
        const img = `<img src="${abs(l.image)}" width="240" alt="${esc(l.name)}" style="display:block;width:100%;max-width:240px;height:auto;">`;
        return `<td align="center" style="padding:8px 10px;">${l.href ? `<a href="${l.href}">${img}</a>` : img}</td>`;
      })
      .join("");
    return row(
      heading(title) +
        `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>${cells}</tr></table>`,
      "center",
    );
  }

  if (section.kind === "flyer") {
    const cap = section.caption
      ? `<p style="margin:8px 0 0;font-size:13px;line-height:1.6;color:${C.ink};">${inlineEmail(section.caption.zh)}<br><br>${inlineEmail(section.caption.en)}</p>`
      : "";
    return row(
      heading(title) +
        `<img src="${abs(section.image)}" width="560" alt="${esc(section.alt.en)}" style="display:block;width:100%;max-width:560px;height:auto;border-radius:6px;">` +
        cap +
        linksRow(section),
      "center",
    );
  }

  // prose / callout — Chinese block, then English block, then links and CTA.
  const numbered = section.kind === "prose" && !!section.numbered;
  const zh = blocksHtml(section.blocks, "zh", numbered);
  const en = blocksHtml(section.blocks, "en", numbered);
  const signoff =
    section.kind === "prose" && section.signoff
      ? { zh: `<p style="${P}">${inlineEmail(section.signoff.zh)}</p>`, en: `<p style="${P}">${inlineEmail(section.signoff.en)}</p>` }
      : { zh: "", en: "" };
  const cta =
    section.kind === "callout" && section.cta
      ? ctaButton(`${section.cta.label.zh} / ${section.cta.label.en}`, section.cta.href)
      : "";

  const body =
    zh + signoff.zh + `<div id="${anchor}" style="margin-top:14px;">` + en + signoff.en + "</div>" + linksRow(section) + cta;

  if (section.kind === "callout") {
    return row(
      heading(title, anchor) +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.goldTint};border-left:4px solid ${C.gold};"><tr><td style="padding:14px 16px;font-family:${FONT};">${body}</td></tr></table>`,
    );
  }
  return row(heading(title, anchor) + body);
}

/** Format an ISO date as the school writes it in the subject line: M/D/YYYY. */
function displayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${Number(m)}/${Number(d)}/${y}`;
}

/** The subject line previous issues used. */
export function emailSubject(issue: NewsletterIssue): string {
  return `費利蒙中文學校 FCS eNews ${displayDate(issue.date)}`;
}

/** The email itself — the fragment that gets pasted into Gmail. */
export function renderIssueEmail(issue: NewsletterIssue): string {
  const sections = issue.sections.filter((s) => s.only !== "web");
  const issueUrl = `${SITE}/enews/${issueSlug(issue)}/`;

  const masthead = row(
    `<a href="${SITE}/"><img src="${SITE}/images/logo.png" width="260" alt="Fremont Chinese School 費利蒙中文學校" style="display:block;width:100%;max-width:260px;height:auto;border:0;margin:0 auto 4px;"></a>
     <div style="font-size:15px;font-weight:bold;color:${C.jadeDeep};margin-top:6px;">FCS eNews ${displayDate(issue.date)}</div>
     <div style="font-size:12px;margin-top:8px;"><a href="${issueUrl}" style="color:${C.jadeDeep};text-decoration:underline;">在網頁上閱讀 / Read on the web</a></div>
     <div style="font-size:12px;margin-top:6px;"><a href="#sec0-en" style="color:${C.jadeDeep};text-decoration:underline;">Skip to English ↓</a></div>`,
    "center",
  );

  const followUs = row(
    heading(FOLLOW_US.title) +
      `<p style="${P}">${FOLLOW_US.zh}</p><p style="${P}">${FOLLOW_US.en}</p>
       <div style="font-size:14px;line-height:1.7;">
         <a href="https://facebook.com/fremontchineseschool" style="color:${C.jadeDeep};">Facebook</a> &nbsp;·&nbsp;
         <a href="https://www.instagram.com/fremontchineseschool/" style="color:${C.jadeDeep};">Instagram</a> &nbsp;·&nbsp;
         <a href="${SITE}/" style="color:${C.jadeDeep};">fremontchineseschool.org</a>
       </div>`,
    "center",
  );

  const footer = row(
    `<div style="font-size:12px;color:${C.inkSoft};padding-top:30px;">${WASC}<br><br>
     費利蒙中文學校 / Fremont Chinese School<br>
     <a href="${SITE}/" style="color:${C.inkSoft};">fremontchineseschool.org</a><br>
     PO Box 1309, Fremont, CA 94538</div>`,
    "center",
  );

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.paper};padding:24px 0;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:${C.paper};max-width:600px;">
${masthead}
${sections.map((s, i) => sectionHtml(s, i)).join("\n")}
${followUs}
${footer}
    </table>
  </td></tr>
</table>`;
}
