// Build a bowl: pinned counter notes and the "say it like a regular" phrasebook.
import { Children, isValidElement, type ReactElement, type ReactNode } from 'react';

type Children = { children: ReactNode };

function NotesRoot({ children }: Children) {
  return <section aria-labelledby="notes-title" className="mt-20 border-y-[3px] border-ink bg-cork/75 py-16" style={{ backgroundImage: 'radial-gradient(rgb(0 0 0 / .12) 1px, transparent 1.4px)', backgroundSize: '9px 9px' }}>
    <div className="wrap">{children}</div>
  </section>;
}
function NotesHeading({ children }: Children) {
  return <h2 id="notes-title" className="inline-block rounded-lg border-2 border-ink bg-surface px-5 py-2 font-display text-3xl font-extrabold text-primary-text shadow-sm">{children}</h2>;
}
const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
function NotesList({ children }: Children) {
  return <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {Children.toArray(children).map((child, i) => <li key={i} className={`relative rounded-sm bg-[#fff8cf] p-5 pt-7 text-[#2b2414] shadow-[0_12px_18px_-8px_rgb(0_0_0/.45)] ${tilts[i % tilts.length]}`}>{child}</li>)}
  </ul>;
}
function Note({ title, children }: Children & { title: string }) {
  return <>
    <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#7a1d17] bg-chilli shadow" />
    <h3 className="hand text-2xl leading-tight">{title}</h3>
    <p className="hand mt-2 text-lg leading-snug">{children}</p>
  </>;
}
export const CounterNotes = Object.assign(NotesRoot, { Heading: NotesHeading, List: NotesList, Note });

type PhraseProps = { vi: string; say: string; children: ReactNode };
function Phrase(_: PhraseProps) { return null; }

function PhrasebookRoot({ children }: Children) {
  const all = Children.toArray(children);
  const phrases = all.filter((child): child is ReactElement<PhraseProps> => isValidElement(child) && child.type === Phrase);
  const rest = all.filter(child => !(isValidElement(child) && child.type === Phrase));
  return <section aria-labelledby="phrases-title" className="wrap mt-20">
    <div className="canteen-card p-2">
      <div className="laminate rounded-xl border-2 border-dashed border-rule p-5 sm:p-8">
        {rest}
        <table className="mt-6 w-full border-collapse text-left">
          <thead className="sr-only"><tr><th scope="col">Vietnamese</th><th scope="col">Say it</th><th scope="col">Meaning</th></tr></thead>
          <tbody>
            {phrases.map(phrase => <tr key={phrase.props.vi} className="grid border-b-2 border-dashed border-rule py-3 last:border-0 sm:table-row">
              <th scope="row" lang="vi" className="text-xl font-bold text-primary-text sm:py-3.5 sm:pr-6">{phrase.props.vi}</th>
              <td className="hand text-xl text-muted sm:py-3.5 sm:pr-6">“{phrase.props.say}”</td>
              <td className="sm:py-3.5">{phrase.props.children}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </section>;
}
function PhrasebookHeading({ children }: Children) {
  return <h2 id="phrases-title" className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-none text-primary-text">{children}</h2>;
}
function PhrasebookIntro({ children }: Children) {
  return <p className="mt-3 max-w-[54ch] text-muted">{children}</p>;
}
export const Phrasebook = Object.assign(PhrasebookRoot, { Heading: PhrasebookHeading, Intro: PhrasebookIntro, Phrase });
