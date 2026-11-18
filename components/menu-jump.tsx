'use client';
import { useEffect, useState } from 'react';

/** Sticky jump bar of plain anchor links; with JavaScript the section in view is highlighted. */
export function MenuJump({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const targets = sections.map(section => document.getElementById(section.id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [sections]);
  return <nav aria-label="Menu sections" className="no-print sticky top-0 z-30 -mt-16 mb-12 border-b-[3px] border-ink bg-surface/95 backdrop-blur">
    <ul className="wrap flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:thin]">
      {sections.map(section => <li key={section.id} className="shrink-0">
        <a href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined}
          className={`block rounded-md border-2 px-3.5 py-1.5 font-semibold no-underline hover:no-underline ${active === section.id ? 'border-primary bg-primary text-on-primary' : 'border-rule bg-tile-soft hover:border-tile'}`}>
          {section.label}
        </a>
      </li>)}
    </ul>
  </nav>;
}
