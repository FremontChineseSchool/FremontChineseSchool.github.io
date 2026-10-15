/**
 * FCS Weekly eNews sender — Google Apps Script.
 *
 * Lives in the principal@fremontchineseschool.org Google account
 * (script.google.com, project "FCS eNews Sender"). This file is the copy of
 * record; if you change the script, change it here too.
 *
 * Every Friday at 10:00 AM Pacific it reads
 *   https://fremontchineseschool.org/enews-email/latest.json
 * (the newest PUBLISHED issue — drafts never appear there) and emails that
 * issue to the parents list. It only sends when:
 *   - the issue is dated within the past week (so a week with no new issue
 *     sends nothing, rather than re-sending last week's), and
 *   - that issue has not already been sent.
 * After every run it emails the principal a one-line report of what happened.
 *
 * Sent with GmailApp, so images in the email display normally — unlike
 * copy-paste, nothing has to be done by hand.
 *
 * One-time setup: run `setup`, click through the Authorize prompt.
 * Day-before check: run `sendTestToMe` (set TEST_EMAIL_URL to test a draft).
 */

const LATEST_URL = 'https://fremontchineseschool.org/enews-email/latest.json';
const PARENTS = 'parents@fremontchineseschool.org';
const TEST_TO = 'angelala24@gmail.com';
// To test a DRAFT before it is published, paste its email link here, e.g.
// 'https://fremontchineseschool.org/enews-email/9f3a1c.raw.html'.
// Leave blank to test the latest published issue.
const TEST_EMAIL_URL = '';

const TZ = 'America/Los_Angeles';
const SEND_WEEKDAY = 5;   // Friday (1 = Monday ... 7 = Sunday)
const SEND_HOUR = 10;     // 10:00 AM Pacific
const MAX_AGE_DAYS = 6;   // only send an issue dated within the past week

/** Run once. Schedules the next Friday 10:00 AM send. Safe to re-run. */
function setup() {
  const when = scheduleNext_();
  Logger.log('Next eNews send scheduled for ' + label_(when));
}

/** The scheduled job. Do not rename — the trigger calls it by name. */
function weeklySend() {
  try {
    const latest = fetchLatest_();
    const props = PropertiesService.getScriptProperties();
    if (!latest.date) {
      report_('No published eNews found. Nothing was sent.');
      return;
    }
    if (props.getProperty('lastSentDate') === latest.date) {
      report_('The ' + latest.date + ' eNews was already sent. Nothing was sent today.');
      return;
    }
    const today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    const ageDays = (Date.parse(today) - Date.parse(latest.date)) / 86400000;
    if (ageDays < 0 || ageDays > MAX_AGE_DAYS) {
      report_('No eNews was published for this week (the newest is ' + latest.date +
              '). Nothing was sent. Once this week\'s issue is published, run sendNowToParents.');
      return;
    }
    send_(latest.emailUrl, PARENTS, latest.subject, latest.webUrl);
    props.setProperty('lastSentDate', latest.date);
    report_('Sent the ' + latest.date + ' eNews to ' + PARENTS + '.');
  } catch (err) {
    report_('The scheduled eNews send FAILED: ' + err + '\nNothing was sent to parents.');
    throw err;
  } finally {
    scheduleNext_();
  }
}

/** Manual fallback: send the latest published issue to parents right now. */
function sendNowToParents() {
  const latest = fetchLatest_();
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('lastSentDate') === latest.date) {
    throw new Error('The ' + latest.date + ' eNews was already sent to parents.');
  }
  send_(latest.emailUrl, PARENTS, latest.subject, latest.webUrl);
  props.setProperty('lastSentDate', latest.date);
  report_('Sent the ' + latest.date + ' eNews to ' + PARENTS + ' (manual send).');
}

/** Day-before check: sends a [TEST] copy to TEST_TO only. */
function sendTestToMe() {
  if (TEST_EMAIL_URL) {
    const html = fetchText_(TEST_EMAIL_URL);
    const subject = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || 'FCS eNews';
    send_(TEST_EMAIL_URL, TEST_TO, '[TEST] ' + subject, '', html);
  } else {
    const latest = fetchLatest_();
    send_(latest.emailUrl, TEST_TO, '[TEST] ' + latest.subject, latest.webUrl);
  }
  Logger.log('Test sent to ' + TEST_TO);
}

// ---------------------------------------------------------------------------

function fetchLatest_() {
  return JSON.parse(fetchText_(LATEST_URL));
}

function fetchText_(url) {
  // Cache-buster so a just-deployed issue is never served stale.
  const sep = url.indexOf('?') === -1 ? '?' : '&';
  return UrlFetchApp.fetch(url + sep + 't=' + Date.now()).getContentText('UTF-8');
}

function send_(emailUrl, to, subject, webUrl, html) {
  const body = html || fetchText_(emailUrl);
  GmailApp.sendEmail(
    to,
    subject,
    'This email is best viewed with images on.' + (webUrl ? ' Read it on the web: ' + webUrl : ''),
    { htmlBody: body }
  );
}

function report_(message) {
  const me = Session.getEffectiveUser().getEmail();
  GmailApp.sendEmail(me, 'FCS eNews sender: ' + message.split('\n')[0].slice(0, 80), message);
  Logger.log(message);
}

/** Replace any pending trigger with one for the next Friday 10:00 AM Pacific. */
function scheduleNext_() {
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'weeklySend'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  const when = nextSendTime_();
  ScriptApp.newTrigger('weeklySend').timeBased().at(when).create();
  return when;
}

function nextSendTime_() {
  const now = new Date();
  for (let d = 0; d <= 7; d++) {
    const day = new Date(now.getTime() + d * 86400000);
    if (Number(Utilities.formatDate(day, TZ, 'u')) !== SEND_WEEKDAY) continue;
    const t = pacific_(Utilities.formatDate(day, TZ, 'yyyy-MM-dd'), SEND_HOUR);
    if (t.getTime() > now.getTime()) return t;
  }
  throw new Error('Could not compute the next send time.');
}

/** `hour`:00 on calendar day `ymd` in Pacific time, daylight saving included. */
function pacific_(ymd, hour) {
  const off = Utilities.formatDate(new Date(ymd + 'T12:00:00Z'), TZ, 'XX'); // e.g. -0700
  const hh = (hour < 10 ? '0' : '') + hour;
  return new Date(ymd + 'T' + hh + ':00:00' + off.slice(0, 3) + ':' + off.slice(3));
}

function label_(date) {
  return Utilities.formatDate(date, TZ, "EEEE, MMMM d, yyyy 'at' h:mm a z");
}
