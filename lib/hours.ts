/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}
/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return fallback; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return fallback;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) return `Open now · until ${today.closes}`;
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
  }
  return 'Closed · see opening hours';
}

/** "10:30" → "10:30 am", "17:00" → "5 pm". Display only; content keeps 24-hour HH:MM. */
export function formatClock(value: string): string {
  const [h, m] = value.split(':').map(Number);
  const suffix = h < 12 ? 'am' : 'pm';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

export type OpeningState =
  | { state: 'unknown' }
  | { state: 'open'; closes: string }
  | { state: 'closed'; opensDay?: Day; opens?: string; today: boolean };

/** Weekday and minutes-past-midnight in the business zone, or undefined for a bad zone. */
export function localNow(timeZone: string, now = new Date()): { day: Day; minutes: number } | undefined {
  if (!timeZone) return undefined;
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return undefined; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const day = part('weekday') as Day;
  if (!DAYS.includes(day)) return undefined;
  return { day, minutes: Number(part('hour')) * 60 + Number(part('minute')) };
}

/** Structured open/closed state in the business zone. Browser-only callers supply the clock. */
export function openingState(hours: readonly OpeningHours[], timeZone: string, now = new Date()): OpeningState {
  const local = localNow(timeZone, now);
  if (!local) return { state: 'unknown' };
  validateHours(hours);
  const index = DAYS.indexOf(local.day);
  const today = hours.find(entry => entry.day === local.day)!;
  if (today.opens && today.closes && local.minutes >= minutes(today.opens) && local.minutes < minutes(today.closes)) {
    return { state: 'open', closes: today.closes };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const entry = hours.find(value => value.day === DAYS[(index + offset) % 7])!;
    if (entry.opens && (offset > 0 || local.minutes < minutes(entry.opens))) {
      return { state: 'closed', opensDay: entry.day, opens: entry.opens, today: offset === 0 };
    }
  }
  return { state: 'closed', today: false };
}

/** Visitor-facing text for an opening state, in 12-hour time. */
export function openingText(state: OpeningState): string {
  if (state.state === 'unknown') return 'See opening hours';
  if (state.state === 'open') return `Open now · until ${formatClock(state.closes)}`;
  if (!state.opens) return 'Closed · see opening hours';
  return `Closed · opens ${state.today ? 'today' : state.opensDay} at ${formatClock(state.opens)}`;
}

const SHORT: Record<Day, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** Consecutive days with the same hours grouped, e.g. { days: 'Tue–Thu', time: '10:30 am – 8:30 pm' }. */
export function hoursSummary(hours: readonly OpeningHours[]): { days: string; time: string }[] {
  validateHours(hours);
  const ordered = DAYS.map(day => hours.find(entry => entry.day === day)!);
  const key = (entry: OpeningHours) => entry.opens ? `${entry.opens}-${entry.closes}` : 'closed';
  const groups: OpeningHours[][] = [];
  for (const entry of ordered) {
    const last = groups.at(-1);
    if (last && key(last[0]) === key(entry)) last.push(entry); else groups.push([entry]);
  }
  return groups.map(group => {
    const first = SHORT[group[0].day]; const last = SHORT[group.at(-1)!.day];
    const { opens, closes } = group[0];
    return { days: group.length > 1 ? `${first}–${last}` : first, time: opens && closes ? `${formatClock(opens)} – ${formatClock(closes)}` : 'Closed' };
  });
}
