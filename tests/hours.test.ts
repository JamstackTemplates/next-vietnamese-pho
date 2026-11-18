import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

import { business } from '../content/business.ts';
import { formatClock, hoursSummary, openingState, openingText } from '../lib/hours.ts';

const LA = 'America/Los_Angeles';
const pho = (iso: string) => openingText(openingState(business.hours, LA, new Date(iso)));
test('Phở Lá Xanh hours: Monday closed, Tuesday and Sunday boundaries in Pacific time', () => {
  assert.doesNotThrow(() => validateHours(business.hours));
  // Monday 2026-11-16 12:00 PST = 20:00Z
  assert.equal(pho('2026-11-16T20:00:00Z'), 'Closed · opens Tuesday at 10:30 am');
  // Tuesday 2026-11-17: 10:29 / 10:30 PST = 18:29Z / 18:30Z; 20:29 / 20:30 PST = 04:29Z / 04:30Z next day
  assert.equal(pho('2026-11-17T18:29:00Z'), 'Closed · opens today at 10:30 am');
  assert.equal(pho('2026-11-17T18:30:00Z'), 'Open now · until 8:30 pm');
  assert.equal(pho('2026-11-18T04:29:00Z'), 'Open now · until 8:30 pm');
  assert.equal(pho('2026-11-18T04:30:00Z'), 'Closed · opens Wednesday at 10:30 am');
  // Sunday 2026-11-22: 16:59 / 17:00 PST = 00:59Z / 01:00Z Monday
  assert.equal(pho('2026-11-23T00:59:00Z'), 'Open now · until 5 pm');
  assert.equal(pho('2026-11-23T01:00:00Z'), 'Closed · opens Tuesday at 10:30 am');
});
test('Phở Lá Xanh hours keep local times across both Pacific DST changes', () => {
  // DST starts Sunday 2026-03-08: 10:00 PDT = 17:00Z (was 18:00Z in PST)
  assert.equal(pho('2026-03-08T16:59:00Z'), 'Closed · opens today at 10 am');
  assert.equal(pho('2026-03-08T17:00:00Z'), 'Open now · until 5 pm');
  // DST ends Sunday 2026-11-01: 10:00 PST = 18:00Z
  assert.equal(pho('2026-11-01T17:59:00Z'), 'Closed · opens today at 10 am');
  assert.equal(pho('2026-11-01T18:00:00Z'), 'Open now · until 5 pm');
  // Friday 21:29 / 21:30 PDT in summer = 04:29Z / 04:30Z Saturday
  assert.equal(pho('2026-07-11T04:29:00Z'), 'Open now · until 9:30 pm');
  assert.equal(pho('2026-07-11T04:30:00Z'), 'Closed · opens Saturday at 10:30 am');
});
test('static/no-zone output stays neutral; summary groups matching days', () => {
  assert.equal(openingText(openingState(business.hours, '')), 'See opening hours');
  assert.equal(openingText(openingState(business.hours, 'Mars/Base')), 'See opening hours');
  assert.equal(formatClock('00:15'), '12:15 am');
  assert.equal(formatClock('12:00'), '12 pm');
  assert.deepEqual(hoursSummary(business.hours), [
    { days: 'Mon', time: 'Closed' },
    { days: 'Tue–Thu', time: '10:30 am – 8:30 pm' },
    { days: 'Fri–Sat', time: '10:30 am – 9:30 pm' },
    { days: 'Sun', time: '10 am – 5 pm' },
  ]);
});
