import type { Metadata } from 'next';
import { BanhMiArt } from '../../components/art/dishes';
import { Legend, PhoBoard, BanhMiBand, RicePlate, StubPair } from '../../components/menu';
import { MenuJump } from '../../components/menu-jump';
import { PageHead } from '../../components/page-head';
import { menu } from '../../content/menu';
import { validateMenu } from '../../lib/menu';
import { absoluteUrl } from '../../lib/paths';
import { jsonLd, menuStructuredData } from '../../lib/structured-data';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Phở in small and large bowls, bánh mì, broken-rice and vermicelli plates, sides and iced drinks, with dietary and allergen markers.',
  alternates: { canonical: absoluteUrl('/menu/') },
};

validateMenu();

export default function MenuPage() {
  return <>
    <PageHead art={<BanhMiArt className="w-full" />}>
      <PageHead.Kicker>Thực đơn</PageHead.Kicker>
      <PageHead.Title>The menu board</PageHead.Title>
      <PageHead.Lede>
        Order and pay at the counter, then find a stool. Every phở and bún comes with a plate of fresh herbs,
        sprouts and lime.
      </PageHead.Lede>
    </PageHead>

    <MenuJump sections={menu.map(section => ({ id: section.id, label: section.title }))} />

    <PhoBoard />
    <BanhMiBand />
    <RicePlate />
    <StubPair />

    <Legend>
      <Legend.AllergenNote>
        Many dishes contain fish sauce, peanuts, soy, gluten or shellfish. Tell us about allergies when you
        order; our kitchen handles all of these.
      </Legend.AllergenNote>
      <Legend.Onwards>
        Want it your way? <Legend.BowlLink>Build your bowl</Legend.BowlLink>.
      </Legend.Onwards>
    </Legend>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(menuStructuredData()) }} />
  </>;
}
