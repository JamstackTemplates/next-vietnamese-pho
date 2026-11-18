'use client';
// Build-your-bowl: choose a broth, noodles, protein and garnish, and the herb-plate bowl redraws.
// It never sends anything: choices live in the page and the URL hash so a guest can show their
// phone at the counter. Without JavaScript the same chips, surcharges and default bowl still render.
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { bowlBase, bowlSteps, type BowlStep } from '../content/bowl';
import { bowlTotal, decodeSelection, defaultSelection, encodeSelection, stepById, stepOptions, type BowlSelection, type Size } from '../lib/bowl';
import { formatPrice } from '../lib/menu';
import { HerbBowl } from './art/herb-bowl';

const money = (value: number) => `$${value.toFixed(2)}`;
const herbIds = stepById('garnish').herbs ?? [];

function chosenIn(step: BowlStep, selection: BowlSelection): string[] {
  return step.choose === 'one' ? [selection[step.id as 'broth' | 'noodles']] : selection[step.id as 'protein' | 'garnish'];
}

function Summary({ selection, total, onReset, className = '' }: { selection: BowlSelection; total: number; onReset: () => void; className?: string }) {
  const rows = bowlSteps.map(step => {
    const ids = chosenIn(step, selection);
    const options = stepOptions(step).filter(option => ids.includes(option.id));
    return { step, options };
  });
  const lower = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);
  const pick = (id: BowlStep['id']) => rows.find(row => row.step.id === id)!.options;
  const said = [
    ['Phở', ...pick('protein').filter(option => !option.addOn).map(option => lower(option.vietnamese))].join(' '),
    ...pick('protein').filter(option => option.addOn).map(option => `thêm ${lower(option.vietnamese)}`),
    ...(selection.noodles === 'banh-pho' ? [] : pick('noodles').map(option => lower(option.vietnamese))),
    ...(selection.broth === 'beef' ? [] : pick('broth').map(option => lower(option.vietnamese))),
    ...(selection.size === 'large' ? ['tô lớn'] : []),
  ].join(', ');
  return <div className={`ticket-shadow ${className}`}>
    <div className="ticket px-5 py-8">
      <div className="flex items-baseline justify-between gap-3 border-b-2 border-dashed border-rule pb-3">
        <h2 className="font-sign text-3xl font-extrabold uppercase tracking-wide text-primary-text">Your bowl</h2>
        <span className="hand text-xl text-muted">{selection.size === 'large' ? 'Large' : 'Small'} · {money(bowlBase[selection.size])} base</span>
      </div>
      <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-sm">
        {rows.map(({ step, options }) => <div key={step.id} className="contents">
          <dt className="font-bold">{step.title}</dt>
          <dd>{options.length ? options.map(option => option.name).join(', ') : <span className="text-muted">None</span>}</dd>
        </div>)}
      </dl>
      <p className="mt-4 rounded-lg border border-rule bg-tile-soft px-3.5 py-2 text-sm"><span className="font-semibold">Say it at the counter: </span><span lang="vi" className="hand text-xl text-primary-text">{said}.</span></p>
      <div className="mt-4 flex items-end justify-between gap-3 border-t-2 border-dashed border-rule pt-3">
        <p className="text-sm text-muted">Estimate to pay<br />at the counter</p>
        <p className="font-sign text-4xl font-extrabold text-broth-text tabular">{money(total)}</p>
      </div>
      <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">Order at the counter.</p>
        <button type="button" onClick={onReset} className="text-link text-sm">Start over</button>
      </div>
    </div>
  </div>;
}

function Chip({ type, name, checked, disabled, onChange, children }: { type: 'radio' | 'checkbox'; name: string; checked: boolean; disabled?: boolean; onChange: () => void; children: ReactNode }) {
  return <label className="chip relative">
    <input type={type} name={name} checked={checked} disabled={disabled} onChange={onChange} />
    {children}
  </label>;
}

export function BowlBuilder() {
  const [selection, setSelection] = useState<BowlSelection>(() => defaultSelection());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const read = () => setSelection(decodeSelection(window.location.hash));
    read();
    setReady(true);
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const hash = `#${encodeSelection(selection)}`;
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
  }, [selection, ready]);

  const total = useMemo(() => bowlTotal(selection), [selection]);
  const update = (next: Partial<BowlSelection>) => setSelection(current => ({ ...current, ...next }));
  const toggle = (step: 'protein' | 'garnish', id: string) => setSelection(current => ({
    ...current, [step]: current[step].includes(id) ? current[step].filter(entry => entry !== id) : [...current[step], id],
  }));
  const reset = () => setSelection(defaultSelection());
  const description = `Your bowl: ${stepOptions(stepById('broth')).find(o => o.id === selection.broth)?.name} broth with ${stepOptions(stepById('noodles')).find(o => o.id === selection.noodles)?.name.toLowerCase()}`;

  return <section aria-labelledby="builder-title" className="wrap">
    <h2 id="builder-title" className="sr-only">Bowl builder</h2>
    <p className="sr-only" role="status" aria-live="polite">{ready ? `Estimate ${money(total)}` : ''}</p>
    <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-start">
      <div className="lg:sticky lg:top-6">
        <div className="teak overflow-hidden rounded-[2rem] border-[3px] border-ink p-4 shadow-lg sm:p-7">
          <HerbBowl all steam bowl={selection} herbIds={herbIds} title={description}
            onPlate={id => !selection.garnish.includes(id)} className="mx-auto w-full max-w-[34rem]" />
        </div>
        <Summary selection={selection} total={total} onReset={reset} className="mt-8 hidden lg:block" />
      </div>

      <form className="grid gap-6" onSubmit={event => event.preventDefault()} aria-describedby="builder-help">
        <p id="builder-help" className="hand text-xl text-muted">Tap to choose. Nothing is sent anywhere. This is just to help you decide.</p>
        <noscript><p className="rounded-md border-2 border-dashed border-rule p-3">The drawing and total only update with JavaScript. Every choice and price is listed below; just tell us at the counter.</p></noscript>

        <div className="ticket-shadow">
          <fieldset className="ticket min-w-0 px-5 py-7">
            <legend className="float-left w-full font-display text-xl font-bold">Bowl size</legend>
            <div className="clear-both flex flex-wrap gap-2 pt-3">
              {(['small', 'large'] as Size[]).map(size => <Chip key={size} type="radio" name="size" checked={selection.size === size} onChange={() => update({ size })}>
                {size === 'small' ? 'Small' : 'Large'} <span className="tabular opacity-80">{money(bowlBase[size])}</span>
              </Chip>)}
            </div>
          </fieldset>
        </div>

        {bowlSteps.map((step, index) => {
          const chosen = chosenIn(step, selection);
          return <div key={step.id} className="ticket-shadow">
            <fieldset className="ticket min-w-0 px-5 py-7">
              <legend className="float-left w-full">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-sign text-4xl font-extrabold leading-none text-broth-text" aria-hidden="true">0{index + 1}</span>
                  <span className="font-display text-xl font-bold">{step.title}</span>
                  <span className="hand text-xl text-primary-text" lang="vi">{step.vietnamese}</span>
                </span>
              </legend>
              <p className="clear-both pt-1 text-sm text-muted">{step.instruction}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stepOptions(step).map(option => {
                  const checked = chosen.includes(option.id);
                  const onChange = () => step.choose === 'one' ? update({ [step.id]: option.id } as Partial<BowlSelection>) : toggle(step.id as 'protein' | 'garnish', option.id);
                  return <Chip key={option.id} type={step.choose === 'one' ? 'radio' : 'checkbox'} name={step.id} checked={checked} disabled={!option.available} onChange={onChange}>
                    <span>{option.name} <span lang="vi" className="text-sm opacity-75">{option.vietnamese}</span></span>
                    {option.surcharge ? <span className="tabular text-sm font-bold">+{formatPrice(option.surcharge)}</span> : null}
                    {!option.available ? <span className="text-sm">Not today</span> : null}
                  </Chip>;
                })}
              </div>
              {step.id === 'broth' ? <p className="mt-3 text-sm text-muted">{stepOptions(step).find(option => option.id === selection.broth)?.note}</p> : null}
            </fieldset>
          </div>;
        })}

        <Summary selection={selection} total={total} onReset={reset} className="lg:hidden" />
      </form>
    </div>
    <div className="no-print sticky bottom-3 z-20 mt-6 flex items-center justify-between gap-3 rounded-full border-[3px] border-ink bg-surface px-5 py-2 shadow-lg lg:hidden" aria-hidden="true">
      <span className="font-semibold">Estimate at the counter</span>
      <span className="font-sign text-2xl font-extrabold text-broth-text tabular">{money(total)}</span>
    </div>
  </section>;
}
