---
name: fcs-weekly-newsletter
description: >-
  Draft and publish the Fremont Chinese School (FCS) weekly eNews — bilingual
  (Traditional Chinese + English) content covering the principal's note,
  calendar/schedule updates, volunteer needs, flyer graphics (class highlights,
  Language Support Club, classroom policy, TA needs), the donation appeal, and
  sponsor logos. Use whenever the user asks to draft this week's newsletter,
  generate eNews content, write the weekly parent email, or update the school
  newsletter on the website. Also trigger on "this week's newsletter," "eNews,"
  "weekly update for parents," or when the user pastes calendar items, volunteer
  needs, or flyer images and wants them turned into newsletter copy. Produces
  two artifacts per issue: one entry in src/data/newsletters.ts (which generates
  the bilingual web pages at /enews/ and /zh/enews/) and one standalone
  email-safe HTML file for pasting into the parent-email send.
---

# FCS Weekly eNews

You write **one** thing: an entry in `src/data/newsletters.ts`. Both artifacts are
generated from it, so they cannot drift.

| | What | Where it lands |
|---|---|---|
| **Web page** | `/enews/<token>/` while a draft, `/enews/<date>/` once published — both locales | generated |
| **Email** | `/enews-email/<slug>.html` — a preview page with the subject line and send steps, wrapping the real email in an iframe | generated |

The email is **not** hand-filled any more. `src/lib/email.ts` renders it from the
same issue data — table layout, inline styles, both languages stacked, skip-to-
English anchors, absolute image URLs. Do not hand-write email HTML, and do not
edit the generated files; fix the data or the renderer.

Because `public/` deploys wholesale, every image URL in the email resolves as
soon as the issue is pushed — **even while it is still a draft.** So the email is
reviewed at the same time as the page, not after publication. Staff care about
the email more: it is what parents see first.

**Read `CLAUDE.md` first** for the bilingual content model. Then read
`src/data/newsletters.ts` — its type definitions are the authoritative field
list. **`assets/example-issue.ts` is the worked example** — one filled-in issue
exercising every section kind. Copy its shape, not its content; every date and
link in it is invented.

Once real issues exist in `src/data/newsletters.ts`, prefer the most recent one
as the model instead: it reflects how the school actually writes.

## What NOT to do

- **Do not hand-write HTML pages for the website.** This is an Astro site; every
  page is assembled through `BaseLayout` (header, nav, footer, site search,
  language toggle, SEO tags). A standalone HTML file dropped into `src/pages/`
  or `public/` renders as a bare page outside the site. The web issue is a data
  entry; `NewsletterIssuePage.astro` owns the markup.
- **Do not create route files.** `/enews/`, `/enews/archive/`, and
  `/enews/<date>/` — in both locales — are generated from the data array by
  `src/pages/enews/[...issue].astro` and its `zh` twin. Publishing an issue
  never touches routing, `ui.ts`, or `descriptions`.
- **Do not invent links, dates, dollar amounts, or tax IDs.** Reuse the real
  ones (see *Known links*) or ask. Keep anything supplied exact — never round.
- **Do not add a section kind by smuggling HTML into a string.** If a week needs
  a shape that doesn't exist, add a `kind` to `IssueSection` and a matching
  branch in `NewsletterIssuePage.astro`.
- **Do not republish mistakes from the source email.** See *Check the source*.
- **Do not hand-write email HTML.** It is generated from the issue data by
  `src/lib/email.ts`. If the email is wrong, the data or the renderer is wrong —
  never patch the generated file.
- **Do not skip the draft stage, and never remove the `draft` field yourself.**
  A new issue is always staged for review first; only the user decides when it
  goes live.
- **Never guess a missing value, and never set `publishWithGaps` on your own
  initiative.** Record the gap (below) and let the build stop the publish. A
  plausible-looking wrong link is worse than a visible hole, because a wrong
  link gets clicked.

## Step 0 — Start from current `main`

Before drafting anything, from the repo root:

```sh
git pull
git status        # expect a clean tree
```

Every issue is appended to a single array in a single file, so drafting on a
stale `main` is how two issues collide or one silently vanishes. If `git pull`
reports a conflict, or `git status` shows unrelated local edits, **stop and
resolve that first** — do not draft on top of a dirty tree.

## Step 1 — Gather this week's inputs

**Right now the principal still drafts each issue in cloudHQ and sends it
herself.** The usual input is therefore her issue — ideally the `.eml`, sometimes
a screenshot first and the `.eml` once it's final — and this repo produces the
web record of it. That is the interim arrangement, not the end state: once she
drives the skill directly, content will arrive as prose plus flyer files and the
email will be generated here. Both paths use the same data entry.

**Ask for the `.eml`, and reconcile against it before publishing.** It is the
only source that carries link targets and the actual image files.

**A screenshot hides link targets.** You can see that text is a link but not
where it points. Ask for every URL explicitly rather than guessing or dropping
it — a plausible-looking wrong link is worse than asking. Record what you cannot
resolve as a gap (below); an `.eml` arriving later will usually close it.

### Recording a gap

When something is missing or unresolved, **record it in the data**. Saying it in
conversation is not enough: it scrolls away, and the reviewer never sees it.

For a link whose target you don't have, use the `TODO` sentinel **in place**, so
the hole appears in the sentence it belongs to:

```ts
text: {
  en: "More photos here: [First Day Photo Album](TODO: ask Angela for the URL).",
  zh: "更多照片請見：[開學日照片集](TODO: ask Angela for the URL)。",
}
```

For anything else — a flyer being redrawn, copy awaiting the principal's read —
add a line to the issue's `gaps` array:

```ts
gaps: ["Classroom Use Policy flyer is being regenerated — swap image and caption when it lands."],
```

What that buys you, automatically:

- The draft page opens with a **red "Needs attention" panel** listing every gap,
  above the issue itself. `TODO` links are found by scanning the copy, so one
  cannot be missed by forgetting to also list it. A link needed in both locales
  counts once.
- The `TODO` link renders as a loud inline marker instead of a broken link.
- **The build refuses to publish the issue.** Removing `draft` while any gap is
  open fails `npm run build` with the gaps listed. This is the enforcement — it
  is not possible to quietly ship a hole.

**The override.** `publishWithGaps: "<reason>"` publishes anyway. It exists for
"send it now, we'll fix the link next week" — and it requires the user to say so
explicitly. Do not reach for it to make a build pass. When the user does ask,
put their actual reason in the string; on a published page the marker quietly
degrades to plain text, so a parent reads a normal sentence rather than staff
chrome.

Ask for whichever of these apply. Not every section runs every week — **skip a
section rather than writing filler**. A quiet week is legitimately one `note`.

- **Principal's note** (校長的話) — the week's theme or announcement.
- **Calendar/schedule changes** — first day, no-school days, deadlines.
- **Logistics** — parking, drop-off routes, room changes. Construction and
  room reassignments make this a recurring section, not a one-off.
- **Volunteer needs** — open roles plus the sign-up link.
- **Flyer sections — the most common section type.** In practice these are
  **pre-made graphics** (usually Canva), with little or no body text: Class
  Highlight, Language Support Club, Classroom Use Policy, Volunteer TA Needed,
  and similar. Ask for the image, don't compose prose to fill the space. Any
  number per week — a repeatable block, not a fixed set of named sections.
- **Donation appeal** — evergreen; reuse the standard copy unless told otherwise.
- **Sponsor logos** — **recurring.** The gold sponsors have appeared in every
  issue so far, and at least one is a longtime supporter expected to keep
  appearing. Carry the block forward, but **confirm the roster each week**
  rather than assuming it is unchanged — and re-check each logo's link (see
  *Check the source*).
- **Follow Us / social** — **email only.** The site footer already carries the
  social links on every page, so it is not a web section.

### Working from a previous issue

Sometimes the input is a past issue, to iterate on rather than start cold. Use it
for tone and running order, but ask what was one-time versus recurring — never
assume a section repeats verbatim, and never carry a date forward.

Past issues are already in `src/data/newsletters.ts`, so prefer copying from
there. If instead a `.eml` turns up (an older issue sent through a mail
provider), parse it with Python's `email` module: the `text/plain` part gives
clean bilingual copy, the `text/html` part gives image URLs and — the part that
matters — which link is wrapped around which image. Drop any tracking pixel
(`mail_track`). Images in such a file live on the provider's CDN and must be
downloaded and committed like any other flyer.

### Dates

`date` is the **send** date, normally the Thursday or Friday 1–3 days before the
Saturday the issue is about — so issues are **not** reliably 7 days apart. Never
compute an issue date by adding 7 to the last one; use the date given.

### Check the source

A forwarded email is a draft, not gospel. Before republishing, verify and raise
anything that looks wrong rather than copying it onto the website:

- **Sponsor logo ↔ link pairings.** These have been wrong before — a logo
  wrapped in a link to an entirely different business. Check each pairing
  against the sponsor list in the text. When one looks doubtful, omit the
  `href` (the logo still renders) and raise it rather than guessing.
- **Typos baked into flyer graphics** — flag them so the graphic can be
  re-exported; never retouch the image.
- **Stray markdown the source editor failed to render** — a literal
  `**「家長/訪客停車場」**` has appeared mid-paragraph in a sent issue. Interpret
  it as the emphasis it was meant to be; never copy the asterisks through.
- **"See attached"** — email attachments have no meaning on a web page. Link the
  real file on the site instead (see *Prefer site assets*).

### Check whether an image is actually new

**Hash it against what is already committed before adding a file.** A screenshot
makes a reused photo look new — the volunteer team photo in the 8/21 issue looked
like a different group and turned out byte-identical to the 8/14 one:

```sh
shasum -a 256 downloaded.jpg public/images/news/*.jpg
```

A match means reuse the committed path. That avoids a duplicate asset, and avoids
recording a gap for something already in the repo.

### Flyer images

Flyers arrive as URLs on the mail provider's CDN (`cloudhq-mkt3.net` for
MailKing). Those are third-party and may not last — **download every one and
commit it to `public/images/news/`**, named `enews-<YYYY-MM-DD>-<subject>.jpg`.
Recurring art that isn't issue-specific (sponsor logos) goes in
`public/images/sponsors/` instead, undated, since the same file is reused.

Committing them is also what makes them usable in the email: mail clients need
an absolute, publicly reachable URL, and once deployed the file lives at
`https://fremontchineseschool.org/images/news/<file>`.

**Consequence: publish the web issue before sending the email**, or every flyer
is a broken image for every parent.

**Optimize before committing.** Canva PNG exports run 1.5–2.3 MB each, and four
of them on one page is a slow phone load. Convert to JPEG at ~1200px wide:

```sh
sips -s format jpeg -s formatOptions 85 --resampleWidth 1200 in.png --out out.jpg
```

That typically takes a photo-ish flyer from ~1.5 MB to ~570 KB with no visible
loss. Eyeball the result when the graphic contains small text — dense tables and
maps have survived quality 85 fine, but check rather than assume.

**JPEG is not always smaller.** A flat-colour graphic can compress better as
PNG: the regenerated Classroom Use flyer was 197 KB as PNG and 246 KB as JPEG.
Try both and keep the smaller file — `ls -S` sorts by size.

### Link hygiene

Two things worth normalising as you transcribe her links:

- **Prefer `https`** and confirm it resolves. She often writes bare
  `http://www.anccs.org`; both that and `www.kidsfunfest.org` serve fine over
  https.
- **Strip tracking suffixes.** Google Drive links arrive with `?usp=sharing` or
  `?usp=drive_link`. They point at the same file without them.

Never change where a link *goes* — only its scheme and its trailing cruft.

### Prefer site assets

When the newsletter refers to something the site already hosts, link that
instead of embedding a picture of it. Issues have gone out with a JPEG of the
class schedule table pasted in, where the web version should link
`/FCS_2026-2027_Class_Schedule.pdf` — the same document, crisper, zoomable,
printable, and a single source of truth. Verify it really is the same version
(check the "updated" date on both) before substituting.

## Step 2 — Draft bilingual copy

Match the school's voice:

- Short, warm, direct sentences — a community newsletter, not a formal notice.
- **Traditional** Chinese (the site is `zh-Hant`), not Simplified.
- Bulleted lists for dates and logistics; short paragraphs for narrative.
- Principal sign-offs: "Warmly," + name + title / 「謹上」+ 姓名 + 校長.
- Section titles are per-locale in the data (`{ en: "…", zh: "…" }`). The
  combined "中文標題 / English Title" pattern is for the **email only**, where
  both languages share one document.

When reproducing an existing issue, keep the school's own wording. Fix only
clear slips, and say what you changed.

### Formatting is yours to apply, not the principal's to write

**The principal does not write Markdown and should never be asked to.** She
composes in a rich-text editor — clicking the bold button, using the hyperlink
dialog. The `**emphasis**` and `[label](href)` syntax is an internal encoding
for the data file. Converting her formatting into it is your job.

**Always preserve what she formatted.** Where she bolded a phrase, emit
`**…**`. Where she hyperlinked text, emit `[…](…)` with the same target. When
you have the HTML or a `.eml`, this is mechanical — read `<strong>`/`<b>` and
`<a href>` out of the markup rather than eyeballing it.

**You may add structure she didn't mark up**, within limits. Her source is often
plain prose, and the web version reads better with real structure:

- Turn a run of "Label: explanation" sentences into a `list`, with the label
  bolded — that is how the parking and drop-off notes are built.
- Add a `subhead` where she has clearly changed topic inside one section.
- Bold a date, room number, or deadline that the sentence hinges on.

**But do not invent emphasis inside a sentence she left plain**, and never add,
remove, or retarget a link. Bolding that varies week to week is the same
inconsistency the data model exists to prevent, and over-bolding destroys
emphasis. When in doubt, less formatting.

**How she edits.** She does not open the data file. She reads the draft page and
says what to change in plain language; you make the edit and push again (Step
5). That is the whole review loop — she never sees the syntax.

Write the Chinese yourself — never leave placeholders. Flag translation nuances
for confirmation instead of guessing on names, dates, or amounts.

Names in the repo (`contactInfo` in `src/i18n/content.ts`): principal
**Angela Ha / 夏芷筠**.

## Step 3 — Add the web issue

Prepend one object to `issues` in `src/data/newsletters.ts`. Newest first, and
**always with a `draft` token** — every new issue starts staged for review.
Publishing is a separate, deliberate step (Step 6).

Generate the token fresh for each issue:

```sh
openssl rand -hex 3      # e.g. 9f3a1c
```

Then set `draft: "9f3a1c"`. While the issue is a draft that token is the whole
URL segment — `/enews/9f3a1c/`, no date. Two reasons:

- A bare dated URL is trivially guessable. Once any issue is published the
  pattern is public, and there are only seven plausible dates in a week.
- The send date is not known early in the week. Drafting starts before anyone
  knows whether the issue goes out Thursday or Friday, so a date in the URL
  would move mid-review and break links already circulated.

Store the token in the data; never generate it at build time, or every build
would move the URL for the same reason. **`date` can be edited freely while an
issue is a draft** — the review URL does not depend on it.

| `kind` | Use for |
|---|---|
| `prose` | Anything narrative — the principal's note, a weekly update, general announcements. Optional `signoff`, optional `numbered`. |
| `callout` | Same content model, rendered in a tinted box with one `cta` — volunteer calls, the donation appeal. |
| `flyer` | A pre-made graphic. `image` + `alt` required. |
| `sponsors` | Logo row. Recurring; confirm the roster each week. |

**Sections are documents, not paragraphs.** `prose` and `callout` hold an ordered
`blocks` array, so one section can carry a sub-heading, prose, a list, an image,
another sub-heading, and more prose — the way the school actually writes:

| `block` | Fields |
|---|---|
| `subhead` | `text` — a bold sub-heading inside the section |
| `prose` | `text` — one paragraph |
| `list` | `items`, optional `ordered: true` |
| `image` | `src`, `alt`, optional `caption` — a map, a schedule, a photo |

Two rules that matter:

- **Do not split a nested section into several top-level sections.** The
  school's "Week N School Update" is one section with sub-headings under it.
  Splitting it flattens the hierarchy and makes "where do I break this" a
  judgement call that comes out differently every week.
- **`numbered: true` numbers the subheads automatically.** That is how "General
  Announcements" reads. Never number them by hand — inserting one would mean
  renumbering the rest.

Every kind also takes an optional `links` row for downloads and supporting
documents. Sections render in the order: title, blocks, links, then cta.

### Inline markup

Prose, list items, subheads, and captions accept exactly two constructs:

```
[label](https://example.com)   ->  a link, inline in the sentence
**emphasis**                   ->  bold
```

Nothing else — no headings, images, lists, or raw HTML in a string. Use them:
the school writes links mid-sentence constantly ("詳情請上官網：[官網](…)",
"Details at [www.anccs.org](…)"), and demoting every one of those to the `links`
row changes how the sentence reads. Block-level content belongs in `blocks`.

`mailto:` and site-absolute paths work too. Anything else — `javascript:`,
`data:` — is left as literal text rather than silently dropped, so a mistake
shows up in review.

Required per issue: `date` (ISO, doubles as slug and sort key), `label` (display
date, both locales), `summary` (one sentence, ~120–160 chars — it becomes the
meta description **and** the archive blurb), and `sections` in running order.

Two things that matter more than they look, for flyers and `image` blocks alike:

- **`alt` describes the image's PURPOSE**, not its title — the title is already
  adjacent on the page.
- **`caption` carries the key facts as real text** — times, room numbers, join
  codes, prices. Text baked into a graphic is invisible to screen readers, to
  site search, and to anyone whose mail client blocks images. This is the single
  highest-value thing the web version adds over the email.

## Step 4 — Check it locally

```sh
npm run build     # type-checks the data entry; fails loudly on a missing
                  # translation, a missing alt, or a bad section kind
npm run preview   # note the port it prints — 4321 may already be in use
```

Open `/enews/<token>/` and `/zh/enews/<token>/` — the draft's review URLs, since
a draft has no `/enews/` alias and no dated URL at all. Confirm:

- Both languages read correctly and the 中文 / English toggle round-trips.
- The draft banner appears at the top of both.
- Every image the page references exists in `dist/`, and every in-site link
  resolves to a real file or directory.

A missing `en`, `zh`, or `alt` is a **type error**, so the build is the
completeness check — don't skip it.

This local pass is for catching mistakes, not for review. Staff review happens on
the real site, in Step 5.

## Step 5 — Publish the draft and circulate it

**Stop and ask for approval to push.** Pushing to `main` deploys to the live
site. Never push on your own initiative.

Publishing a *draft* is low-stakes, and worth saying so plainly: the issue becomes
readable at its permalink, but it is not the current issue, not in the archive,
not in the footer, not in the sitemap, carries `noindex`, and says "Draft — not
yet sent" at the top. Nobody stumbles onto it; only someone with the link sees it.

Also name anything still unresolved from *Check the source* — a sponsor link left
off, a typo in a flyer graphic, Chinese the principal hasn't reviewed. Those are
exactly what review is for, and anything recorded as a gap is already on the page
in red, so point the reviewer at it rather than restating the whole list.

On approval:

```sh
git add src/data/newsletters.ts public/images
git commit -m "eNews: stage the <Month D, YYYY> issue for review"
git push
gh run watch    # waits for the deploy; if it reports no run yet, retry in a few seconds
```

Stage those paths explicitly rather than `git add -A` — the working tree may hold
unrelated edits, and the issue should land as one clean commit.

Then give the user **three** links to circulate:

```
https://fremontchineseschool.org/enews-email/<token>.html   ← the email, review this first
https://fremontchineseschool.org/enews/<token>/
https://fremontchineseschool.org/zh/enews/<token>/
```

Lead with the email: it is what parents see first, and the web page is for people
who click through or come back later. The email preview carries the subject line,
the send steps, and any unresolved gaps; the draft page links to it too.

Say that these are safe to share with staff, that no dated URL exists until the
issue is published, and that parents will not see the issue on the site until
Step 6. The links stay valid through every revision — including a change to the
issue's send date.

**Revisions loop here.** Edit the data, `npm run build`, push again, and the
permalink updates in a minute or two. Stay in this step until the issue is
approved — there is no cost to pushing a draft repeatedly.

## Step 6 — Go live

Only when the user says the issue is approved:

1. **Delete the whole `draft` line** from the issue — delete it, don't blank the
   token.
   - If the build then fails with `[enews] Refusing to publish`, an unresolved
     gap remains. **Stop and report it** — restore the `draft` token and tell the
     user what is missing. Do not delete the gap, and do not set
     `publishWithGaps`, unless they explicitly say to publish anyway.
2. `npm run build`, then confirm `/enews/` and `/enews/archive/` now exist and the
   draft banner is gone.
3. Commit and push:

```sh
git add src/data/newsletters.ts
git commit -m "eNews: publish the <Month D, YYYY> issue"
git push
gh run watch
```

Deleting that one line is what makes it the current issue, adds it to the archive,
and turns on the footer link and the `/news` card. The issue also moves from its
tokenized review URL to the clean dated one, so the review links start 404ing —
intended, since a review link should not outlive the review. Tell the user, so
nobody is confused by a dead link they shared earlier.

Then confirm the images are live on the published page:

```sh
curl -s -o /dev/null -w '%{http_code}\n' \
  https://fremontchineseschool.org/images/news/enews-<YYYY-MM-DD>-<subject>.jpg
```

Repeat until it returns `200`. If it still 404s after the run completes, stop and
investigate.

## Step 7 — Hand the email over

Nothing to build: the email was generated in Step 5 and regenerated on every
push. Publishing in Step 6 rebuilds it once more, which is what swaps its "Read
on the web" link from the review URL to the published dated one — so **send the
copy that exists after Step 6**, not one saved earlier.

Give the user the preview URL for the published slug:

```
https://fremontchineseschool.org/enews-email/<YYYY-MM-DD>.html
```

That page carries the subject line and the send steps, so there is nothing to
recite. In short: click inside the email, ⌘A, ⌘C, paste into Gmail, test to
yourself first, then send to the parents list. The email sits in an iframe so
⌘A selects only the email and not the instructions around it.

If images don't survive the paste, the fallback is to drag the files from
`public/images/news/` into the compose window — that attaches them, which always
displays, including in clients that block remote images.

This skill drafts and publishes the web page and generates the email. It has no
access to the school's mailing list — a human sends it.

### If a section belongs to only one artifact

Both artifacts render from the same sections, which is the point. For the rare
exception, set `only: "email"` or `only: "web"` on the section.

Evergreen email boilerplate is NOT that: the Follow Us block and the WASC line
live in `src/lib/email.ts` because they never change issue to issue. Don't add
them to the data.

## Known links (reuse, don't invent)

From `links` in `src/i18n/content.ts`: calendar PDFs (`calendarEn`,
`calendarZh`), registration (`register`), `facebook`, `instagram`.

Site assets: `/FCS_2026-2027_Class_Schedule.pdf`, `/student-resources`,
`/calendar`, `/enroll`, `/events`, and `/donate` — which carries the EIN
**94-2978949** and the principal's email. The school has **no** online donation
checkout, so never link a payment processor.

Per-issue links are NOT in the repo — ask for them, don't fabricate. These were
in use as of the 2026-08-14 issue and are a starting point only; **confirm each
one is current before reusing it**:

- Volunteer sign-up — `https://forms.gle/MtdWWWUWagNWP1u8A`
- Volunteer positions list —
  `https://drive.google.com/file/d/1500DSGZhrjpR4s9M4s8_OLxgXv7k5ePN/view`
- TA sign-up —
  `https://docs.google.com/forms/d/e/1FAIpQLScN1hL35KbtGTcy_4Yq2KjQNrqra6G7rUf-TDfqcCGpRXOauA/viewform`
- Employer volunteer-rewards instructions —
  `https://docs.google.com/presentation/d/1Op2TlZ4wFSz7epqziWHmEauqEa5FnqRJ5yJofqQhpqs/edit`

## Scope notes

- Calendar data is **not** pulled automatically — someone has to say what
  changed. Automating that would be a separate integration, not something to
  fake here.
- The web issue is canonical if the two artifacts ever drift.
- The footer's "Weekly eNews" link and the promo card on `/news` appear
  automatically once the first issue exists — no wiring needed.
