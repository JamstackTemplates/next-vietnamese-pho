import type { Metadata } from 'next';
import { BowlTicket, BrothTimeline, Hero, HerbBasket, MenuBoards, Visit } from '../components/home';
import { validateBowl } from '../lib/bowl';
import { validateHerbs, validateMenu } from '../lib/menu';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

// Fail the build with the item to fix if menu, herb or bowl content is invalid.
validateMenu();
validateHerbs();
validateBowl();

export default function HomePage() {
  return <>
    <Hero>
      <Hero.Sign>Phở · Bánh mì · Cơm — Pike Place Market</Hero.Sign>
      <Hero.Heading>Broth on since 4 a.m. Herbs picked this morning.</Hero.Heading>
      <Hero.Introduction>
        Phở, bánh mì and rice plates at Pike Place Market, with a basket of herbs on every table.
      </Hero.Introduction>
      <Hero.Actions>
        <Hero.MenuAction>See the menu</Hero.MenuAction>
        <Hero.BowlAction>Build your bowl</Hero.BowlAction>
      </Hero.Actions>
      <Hero.Status />
    </Hero>

    <MenuBoards>
      <MenuBoards.Heading>Three menus, one counter</MenuBoards.Heading>
      <MenuBoards.Intro>
        Order at the counter, grab a stool and we’ll bring it over. Here’s what most people point at.
      </MenuBoards.Intro>
    </MenuBoards>

    <BrothTimeline>
      <BrothTimeline.Heading>The broth clock</BrothTimeline.Heading>
      <BrothTimeline.Intro>
        Our beef broth isn’t a recipe so much as a shift. It starts before the market lights come on and
        it’s ready when the doors open.
      </BrothTimeline.Intro>
      <BrothTimeline.Step time="4:00" title="Bones in">
        Beef marrow and knuckle bones are blanched, scrubbed and lowered into the big pot.
      </BrothTimeline.Step>
      <BrothTimeline.Step time="4:30" title="Char the aromatics">
        Onions and ginger go straight onto the flame until their skins blister black.
      </BrothTimeline.Step>
      <BrothTimeline.Step time="5:00" title="Toast the spices">
        Star anise, cinnamon, clove, black cardamom and coriander seed, toasted dry, then bagged into the pot.
      </BrothTimeline.Step>
      <BrothTimeline.Step time="9:30" title="Skim and season">
        Five hours of skimming later: fish sauce, rock sugar and salt, tasted spoon by spoon.
      </BrothTimeline.Step>
      <BrothTimeline.Step time="10:30" title="First bowls">
        The shutter goes up and the first ladle goes over a bowl of fresh noodles.
      </BrothTimeline.Step>
    </BrothTimeline>

    <HerbBasket>
      <HerbBasket.Heading>Today’s herb basket</HerbBasket.Heading>
      <HerbBasket.Intro>
        Every bowl comes with a plate of these, washed and picked this morning. Tear them in as you go,
        and ask for more whenever you like. It’s free.
      </HerbBasket.Intro>
    </HerbBasket>

    <BowlTicket>
      <BowlTicket.Lead>
        <BowlTicket.Heading>Your bowl, your way</BowlTicket.Heading>
        <BowlTicket.Text>
          Pick a broth, a noodle, your protein and the garnish, then tell us at the counter.
        </BowlTicket.Text>
      </BowlTicket.Lead>
      <BowlTicket.Steps />
    </BowlTicket>

    <Visit>
      <Visit.Heading>Come find the green counter</Visit.Heading>
      <Visit.Text>
        Walk-ins only. Order at the counter, pay there too, and we’ll bring your bowl to your stool.
      </Visit.Text>
    </Visit>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
  </>;
}
