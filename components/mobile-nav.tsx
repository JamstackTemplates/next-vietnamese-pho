'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

/** Small-screen navigation. A <details> disclosure works without JavaScript; it closes on navigation. */
export function MobileNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  return <details ref={ref} className="group md:hidden">
    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border-2 border-ink bg-surface px-3.5 font-semibold [&::-webkit-details-marker]:hidden">
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" /><path d="M6 6l12 12M18 6 6 18" className="hidden group-open:block" />
      </svg>
      <span>Pages</span>
    </summary>
    <div className="absolute inset-x-0 top-full z-50 border-y-[3px] border-ink bg-surface shadow-xl">
      <nav aria-label="Main" className="wrap grid gap-1 py-4 text-lg font-semibold [&_a]:block [&_a]:rounded-md [&_a]:px-3 [&_a]:py-2.5 [&_a:hover]:bg-tile-soft">{children}</nav>
    </div>
  </details>;
}
