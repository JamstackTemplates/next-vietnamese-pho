import type { Metadata } from 'next';
import { PhoSide } from '../../components/art/dishes';
import { BowlBuilder } from '../../components/bowl-builder';
import { CounterNotes, Phrasebook } from '../../components/bowl-extras';
import { Legend } from '../../components/menu';
import { PageHead } from '../../components/page-head';
import { validateBowl } from '../../lib/bowl';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Build your bowl',
  description: 'Pick a broth, noodles, protein and garnish for a custom phở or bún bowl, see the estimate, then order at the counter.',
  alternates: { canonical: absoluteUrl('/bowl/') },
};

validateBowl();

export default function BowlPage() {
  return <>
    <PageHead art={<PhoSide className="w-full" title="A bowl of phở with noodles lifted on chopsticks" />}>
      <PageHead.Kicker>Tô phở của bạn</PageHead.Kicker>
      <PageHead.Title>Build your bowl</PageHead.Title>
      <PageHead.Lede>
        Four choices, then tell us at the counter. Herbs are free and refills of the herb plate are too.
        This page doesn’t place an order; it just helps you decide.
      </PageHead.Lede>
    </PageHead>

    <BowlBuilder />

    <CounterNotes>
      <CounterNotes.Heading>Counter notes</CounterNotes.Heading>
      <CounterNotes.List>
        <CounterNotes.Note title="Taking it away?">
          Ask for the broth on the side. We pack it hot, the noodles stay springy, and you pour it over at your desk.
        </CounterNotes.Note>
        <CounterNotes.Note title="Tái means rare">
          The steak arrives pink and cooks in the broth on the way to your stool. Stir it under if you like it done.
        </CounterNotes.Note>
        <CounterNotes.Note title="Extra herbs are free">
          Finished the basil? Wave at the counter. The herb plate refills as often as you like.
        </CounterNotes.Note>
        <CounterNotes.Note title="Gluten-free?">
          Ask for gluten-free soy and skip the hoisin. Chicken and brisket phở are gluten-free as they come.
        </CounterNotes.Note>
      </CounterNotes.List>
    </CounterNotes>

    <Phrasebook>
      <Phrasebook.Heading>Say it like a regular</Phrasebook.Heading>
      <Phrasebook.Intro>
        Nobody minds if you point at the board. But if you want to try, these five phrases cover most orders.
      </Phrasebook.Intro>
      <Phrasebook.Phrase vi="Cho tôi một tô phở tái." say="chaw toy mot toh fuh tie">One rare-steak phở, please.</Phrasebook.Phrase>
      <Phrasebook.Phrase vi="Tô lớn." say="toh lun">A large bowl.</Phrasebook.Phrase>
      <Phrasebook.Phrase vi="Không hành." say="khome hahn">No onions.</Phrasebook.Phrase>
      <Phrasebook.Phrase vi="Thêm rau, cảm ơn." say="tem zow, gahm un">More herbs, thank you.</Phrasebook.Phrase>
      <Phrasebook.Phrase vi="Ngon quá!" say="ngon kwah">So delicious!</Phrasebook.Phrase>
    </Phrasebook>

    <Legend>
      <Legend.AllergenNote>
        Many dishes contain fish sauce, peanuts, soy, gluten or shellfish. Tell us about allergies when you
        order; our kitchen handles all of these.
      </Legend.AllergenNote>
      <Legend.Onwards>
        Rather order something classic? <Legend.MenuLink>See the full menu</Legend.MenuLink>.
      </Legend.Onwards>
    </Legend>
  </>;
}
