'use client';
import { useEffect, useState } from 'react';
import { DAYS, formatClock, localNow, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Weekly hours. Today's row is highlighted only in the browser, in the business time zone. */
export function HoursTable({ hours, className = '' }: { hours: readonly OpeningHours[]; className?: string }) {
  const [today, setToday] = useState<Day | undefined>();
  useEffect(() => {
    const update = () => setToday(localNow(site.timeZone)?.day);
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);
  return <table className={`w-full border-collapse text-left tabular ${className}`}>
    <caption className="sr-only">Opening hours</caption>
    <tbody>
      {DAYS.map(day => {
        const entry = hours.find(value => value.day === day);
        const isToday = day === today;
        return <tr key={day} aria-current={isToday ? 'date' : undefined}
          className={`border-b border-dashed border-rule last:border-0 ${isToday ? 'bg-tile-soft font-bold' : ''}`}>
          <th scope="row" className="py-1.5 pl-2 pr-3 font-semibold">{day}{isToday ? <span className="hand block font-normal leading-none text-primary-text sm:ml-2 sm:inline">today</span> : null}</th>
          <td className="whitespace-nowrap py-1.5 pr-2 text-right text-[.9rem] sm:text-base">{entry?.opens && entry.closes ? `${formatClock(entry.opens)} – ${formatClock(entry.closes)}` : 'Closed'}</td>
        </tr>;
      })}
    </tbody>
  </table>;
}
