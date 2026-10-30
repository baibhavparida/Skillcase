// Free live demo classes, rebuilt from the learner platform's event pages
// (learner.skillcase.in/events/<slug>) at /events/<slug> on this site.
//
// Copied from its events API (GET learnerapi.skillcase.in/api/events/<slug>)
// on 2026-10-29 and rewritten from its description, without adding promises
// it doesn't make. Registration goes through /api/events/<slug>/register
// (src/worker.js) to the platform's own registration, which emails the
// Google Meet link, as the learner site's form does.
export const events = [
  {
    slug: "7cdknjvd",
    title: "Nursing Jobs in Germany",
    kicker: "Free live demo",
    // The page's search description; not shown on the page (owner's call).
    lede: "Start here. Join Skillcase’s free live demo on Google Meet and kickstart your German learning.",
    // The team's own description in the CMS, word for word: the page shows
    // it as free text under "About the demo", as Luma shows a host's (blank
    // lines start paragraphs, line breaks stay, **bold** is bold). Copy it
    // again when the team changes it.
    description:
      "👩‍⚕️ **Nursing Jobs in Germany — Start Here!**\nJoin Skillcase and kickstart your German learning ✅\n\n📚 A1 to B2 Preparation\n🎯 German Language + Exam Prep + Interview Training\n✈️ Complete support for Germany nursing pathway\n\n🕡 **Time: 08:00 PM (IST)**\n💻 Mode: Google Meet\n✅ FREE Demo – Limited Seats!",
    // The CMS's own words ("FREE Demo – Limited Seats!").
    seats: "Limited seats",
    // Every Monday, Wednesday, Thursday and Saturday, 8 to 9 PM IST: the days
    // and time of the CMS's recurring event (BYDAY=MO,WE,TH,SA, 8:00 PM). Its
    // 30 sessions ran out in July 2026 and the API lists none upcoming, so
    // the site keeps the weekly days going. Check with the team whenever the
    // schedule changes. Days: 0 is Sunday.
    schedule: { days: [1, 3, 4, 6], hour: 20, minute: 0, minutes: 60 },
    // Shown after registering; the Worker swaps in the platform's current
    // link when the registration goes through.
    meetingLink: "https://meet.google.com/yvm-zikd-orv",
    image: "/assets/images/webinar-nurses.webp",
  },
];

// The free demo the site's "Register" buttons lead to (homepage hero and
// webinar card; the older kept-aside pages link the same path).
export const demoEvent = events[0];
export const demoUrl = `/events/${demoEvent.slug}/`;

// ---- Sessions, worked out in India's time (UTC+5:30, no daylight saving) ----

const IST = 330 * 60000;
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// The next `count` sessions that haven't started, as Dates.
export function nextSessions(schedule, now = new Date(), count = 4) {
  const today = new Date(now.getTime() + IST);
  const sessions = [];
  for (let add = 0; sessions.length < count && add < 28; add++) {
    const day = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + add));
    if (!schedule.days.includes(day.getUTCDay())) continue;
    const start = new Date(day.getTime() + (schedule.hour * 60 + schedule.minute) * 60000 - IST);
    if (start > now) sessions.push(start);
  }
  return sessions;
}

// Calendar days from `now` to `date` in India (0 today, 1 tomorrow).
function daysAway(date, now) {
  const day = (time) => {
    const local = new Date(time.getTime() + IST);
    return Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  };
  return Math.round((day(date) - day(now)) / 86400000);
}

// A session's date and time as people in India read it. Written by hand so
// every browser prints the same thing.
export function describeSession(start, now = new Date(), minutes = 60) {
  const local = new Date(start.getTime() + IST);
  const gap = daysAway(start, now);
  const weekday = WEEKDAYS[local.getUTCDay()];
  const month = MONTHS[local.getUTCMonth()];
  const from = local.getUTCHours() * 60 + local.getUTCMinutes();
  return {
    weekday,
    day: local.getUTCDate(),
    month,
    short: gap === 0 ? "Today" : gap === 1 ? "Tomorrow" : weekday.slice(0, 3),
    date: `${local.getUTCDate()} ${month.slice(0, 3)}`,
    long: `${weekday}, ${local.getUTCDate()} ${month}`,
    at: `${clock(from)} ${meridiem(from)}`,
    time: timeRange(from, minutes),
  };
}

// "8:00 PM", when a session starts.
export const scheduleStart = (schedule) => {
  const total = schedule.hour * 60 + schedule.minute;
  return `${clock(total)} ${meridiem(total)}`;
};

// "8:00–9:00 PM IST" for the schedule, before any date is known.
export const scheduleTime = (schedule) => timeRange(schedule.hour * 60 + schedule.minute, schedule.minutes);

function timeRange(from, minutes) {
  const to = from + minutes;
  return meridiem(from) === meridiem(to)
    ? `${clock(from)}–${clock(to)} ${meridiem(to)} IST`
    : `${clock(from)} ${meridiem(from)}–${clock(to)} ${meridiem(to)} IST`;
}

const meridiem = (total) => (Math.floor(total / 60) % 24 < 12 ? "AM" : "PM");

// 1200 -> "8:00" (minutes after midnight).
function clock(total) {
  const hour = Math.floor(total / 60) % 24;
  return `${((hour + 11) % 12) + 1}:${String(total % 60).padStart(2, "0")}`;
}

// "Starts in 40 minutes", "in 5 hours", "tomorrow", "in 3 days": the real
// time left, by the clock today and by the calendar after that.
export function startsIn(start, now = new Date()) {
  const minutes = Math.max(0, Math.round((start - now) / 60000));
  const gap = daysAway(start, now);
  if (gap === 0) {
    if (minutes < 60) return minutes <= 1 ? "Starts in a minute" : `Starts in ${minutes} minutes`;
    const hours = Math.round(minutes / 60);
    return hours === 1 ? "Starts in an hour" : `Starts in ${hours} hours`;
  }
  return gap === 1 ? "Starts tomorrow" : `Starts in ${gap} days`;
}

// "Every Monday, Wednesday, Thursday and Saturday", before the page has
// worked out the next dates.
export function scheduleDays(schedule) {
  const names = schedule.days.map((day) => WEEKDAYS[day]);
  return `Every ${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

// "Mon, Wed, Thu & Sat", where there's little room.
export function scheduleDaysShort(schedule) {
  const names = schedule.days.map((day) => WEEKDAYS[day].slice(0, 3));
  return `${names.slice(0, -1).join(", ")} & ${names.at(-1)}`;
}

// An "Add to Google Calendar" link for one session.
export function calendarLink(event, start, meetingLink) {
  const stamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const end = new Date(start.getTime() + event.schedule.minutes * 60000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Skillcase: ${event.title} (free live demo)`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `Free live demo with Skillcase on Google Meet.\nJoin: ${meetingLink}`,
    location: meetingLink,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
