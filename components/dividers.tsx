// Section dividers: a gạch bông tile strip, chopsticks laid end to end, and a scalloped bowl rim.
import { C, LINE } from './art/palette';

export function TileDivider({ className = '' }: { className?: string }) {
  return <div className={`tile-strip ${className}`} aria-hidden="true" />;
}

export function ChopstickDivider({ className = '' }: { className?: string }) {
  const pair = (x: number) => <g key={x} transform={`translate(${x} 0)`}>
    <path d="M4 5L150 3L150 7L4 9Z" fill={C.bamboo} stroke={LINE} strokeWidth={1.2} strokeLinejoin="round" />
    <path d="M4 13L150 11L150 15L4 17Z" fill={C.bamboo} stroke={LINE} strokeWidth={1.2} strokeLinejoin="round" />
    <path d="M118 3.4L150 3L150 7L118 7.5ZM118 11.4L150 11L150 15L118 15.5Z" fill={C.stool} />
  </g>;
  return <svg viewBox="0 0 960 20" preserveAspectRatio="xMidYMid slice" className={`h-5 w-full ${className}`} aria-hidden="true">
    {[0, 162, 324, 486, 648, 810].map(pair)}
  </svg>;
}

export function BowlRimDivider({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`h-5 w-full ${className}`} style={{
    background: 'radial-gradient(circle at 12px 0, transparent 9px, var(--tile) 10px, var(--tile) 13px, transparent 14px) 0 0 / 24px 20px repeat-x',
  }} />;
}
