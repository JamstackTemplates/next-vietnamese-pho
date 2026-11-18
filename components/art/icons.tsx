// Small icons in the shared line style (24 × 24, 2px line, rounded joins).
import type { ReactNode } from 'react';
import type { Tag } from '../../content/menu';

type IconProps = { className?: string; title?: string };

function Icon({ children, className = 'h-5 w-5', title }: IconProps & { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
    className={className} {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}>{children}</svg>;
}

export const SteamIcon = (p: IconProps) => <Icon {...p}><path d="M4 14h16a8 6 0 0 1-16 0Z" /><path d="M9 10c-1.5-1.5 1.5-3 0-5M14 10c-1.5-1.5 1.5-3 0-5" /></Icon>;
export const LeafIcon = (p: IconProps) => <Icon {...p}><path d="M5 19C4 9 11 4 20 4c0 9-5 16-15 15Z" /><path d="M5 19 14 10" /></Icon>;
export const SproutIcon = (p: IconProps) => <Icon {...p}><path d="M12 21v-9" /><path d="M12 12C12 7 8 5 4 5c0 4 3 7 8 7ZM12 14c0-4 3-7 8-7 0 4-3 7-8 7Z" /></Icon>;
export const ChilliIcon = (p: IconProps) => <Icon {...p}><path d="M7 9c3 0 4 4 7 7s6 4 7 4c-6 2-14-1-16-7-.5-2 .5-4 2-4Z" /><path d="M7 9c0-2 1-4 3-5" /></Icon>;
export const PeanutIcon = (p: IconProps) => <Icon {...p}><path d="M9 3c3 0 4 2 4 4s1 3 3 4 3 3 3 5a5 5 0 0 1-9 2c-1-2-1-3-3-4S3 13 3 10s3-7 6-7Z" /><path d="M8 7h.01M11 15h.01M15 17h.01" /></Icon>;
export const FishIcon = (p: IconProps) => <Icon {...p}><path d="M3 12c4-6 11-6 15 0-4 6-11 6-15 0Z" /><path d="M18 12l3-3v6Z" /><path d="M8 11h.01" /></Icon>;
export const GrainIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M9 9c1 1 2 2 3 2M15 9c-1 1-2 2-3 2M9 13c1 1 2 2 3 2M15 13c-1 1-2 2-3 2" /><path d="M5 19 19 5" /></Icon>;
export const ClockIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
export const PinIcon = (p: IconProps) => <Icon {...p}><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
export const PhoneIcon = (p: IconProps) => <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Icon>;
export const MailIcon = (p: IconProps) => <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
export const BasilMark = (p: IconProps) => <svg viewBox="0 0 32 32" className={p.className ?? 'h-7 w-7'} aria-hidden="true">
  <path d="M4 28C3 14 13 4 28 4c0 15-10 25-24 24Z" fill="var(--tile)" stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
  <path d="M5 27 21 11M10 22l-1-6M14 18l-1-6M10 22l6 1M14 18l6 1" fill="none" stroke="var(--lime)" strokeWidth={1.6} strokeLinecap="round" />
</svg>;

export const TAG_ICONS: Record<Tag, (p: IconProps) => ReactNode> = {
  vegan: LeafIcon,
  vegetarian: SproutIcon,
  'gluten-free': GrainIcon,
  spicy: ChilliIcon,
  'contains-peanut': PeanutIcon,
  'contains-fish-sauce': FishIcon,
};
