export type Element = {
  /** @readonly Type checking stuff */
  type: 'Element';
  /** Name of the element. */
  name: 'ice' | 'fire' | 'air' | 'earth';
  img: string;
  /** Current level of the element during the run. */
  currentLevel: number;
  /** All levels of the element. */
  levels: {
    /** Level number */
    level: number;
    /** Level name */
    name: string;
    /** Full description of the level's effects. */
    description: string;
  }[];
};

export type Level = {
  /** ID of level */
  id: number;
  /** X-position of the level on the map, in pixels. */
  x: number;
  /** Y-position of the level on the map, in pixels. */
  y: number;
  /** Background image of the level during game phase. */
  levelImg: string;
  /** Image of the level marker on the map. */
  mapImg: string;
  /** Type of level */
  type: 'fight' | 'harderFight' | 'shop' | 'relic' | 'boss';
  /** Whether or not the level appears on the map as a mystery level. */
  mystery: boolean;
  /** Whether or not the level was completed or is no longer accessible. */
  completed: boolean;
  /** Hex code of the level marker's color on the map. */
  color: string;
  /** Enemy stats, if applicable. */
  enemy: {
    /** Number of lives. */
    lives: number;
    /** Number of slots. */
    slots: number;
    /** Hex code color of the enemy. */
    color: string;
  } | null;
  /** Array of children level IDs, if applicable. */
  nextLevels: number[] | null;
};

export type Relic = {
  /** @readonly Type checking stuff */
  type: 'Relic';
  /** Name of the relic */
  name: string;
  /** ID of the relic */
  id: number;
  /** Image of the relic */
  img: string;
  /** Description of the relic */
  description: string;
  /** Whether or not the relic is unlocked during the run */
  unlocked: boolean;
  /** Whether or not the relic is broken during the run
   *
   * Only applies to JETT REBIBE ME
   */
  broken?: boolean;
};

export type Powerup = {
  /** @readonly Type checking stuff */
  type: 'Powerup';
  /** Name of the powerup */
  name: string;
  /** ID of the powerup */
  id: number;
  /** Image of the powerup */
  img: string;
  /** Description of the powerup */
  description: string;
  /** Number of this powerup in this run */
  count: number;
};

export const relics: Relic[] = [
  {
    type: 'Relic',
    name: 'Green Energy',
    id: 0,
    img: '/game/relics/leaf.svg',
    description: "As the mayor of NotYamogusCity, you've invested heavily into greener energy. Using an element costs **20% less energy.**",
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Global Warming? Fake News',
    id: 1,
    img: '/game/relics/factory.svg',
    description: "Climate change isn't real, it can't hurt us. Using an element costs **20% more energy.**",
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Battery Pack',
    id: 2,
    img: '/game/relics/battery.svg',
    description: 'You bought a battery pack. Increase max energy by **50** and increase the energy overload threshold by **75.**',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'JETT REBIBE ME',
    id: 3,
    img: '/game/relics/revive.png',
    description:
      "Jett finally learned how to rebibe. When taking fatal damage, Jett will rebibe you and you'll return to the mortal plane with **25%** of your max HP. This relic will be destroyed on rebibe.",
    unlocked: false,
    broken: false
  },
  {
    type: 'Relic',
    name: 'Medkit',
    id: 4,
    img: '/game/relics/medkit.png',
    description: 'You carry arround an medkit wherever you go because you get hurt so often. At the end of every battle, heal back to full HP.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Blizzard',
    id: 5,
    img: '/game/relics/snowglobe.svg',
    description:
      'Recent weather reports suggest that **dust storms** have gone subzero. **Dust storms** turn into **Blizzards** if there is at least **1** ice tile on the board, which have a **5%** chance to damage the enemy for **1** life, if the **dust storm** successfully prevents an attack.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Ice Cold',
    id: 6,
    img: '/game/relics/icecube.svg',
    description: 'They call you the ice man, because you have ice in your veins. **Explosions** deal **15** less damage to you. You should definitely see a doctor about your ice though.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Minor Oil Spill',
    id: 7,
    img: '/game/relics/oil.svg',
    description: 'You accidentally spilled 134 million tons of oil on yourself... whoops! **Explosions** deal **10** more damage to you, but also damage the enemy for **1** life.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'This is Fine',
    id: 8,
    img: '/game/relics/thisIsFine.png',
    description: "Everything is on fire, but it's definitely all under control. **Arson** sets **2** tiles on **fire** when it would normally only set **1**.",
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Skydiving Waiver',
    id: 9,
    img: '/game/relics/waiver.svg',
    description: 'You just signed away all of your important legal rights and first-born child. However, your chances of **yeeting** adjacent tiles are doubled. Worth!',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Silent but Deadly',
    id: 10,
    img: '/game/relics/fart.svg',
    description: "When you **yeet** more than **7** tiles, one of the tiles releases the fart they've been holding in for hours, damaging the enemy for **1** life.",
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'White Sticky Substance',
    id: 11,
    img: '/game/relics/glue.svg',
    description: 'New harder, better, faster, and stronger glue holds tiles in place more effectively. **Grounded** tiles do not change at all.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Anger Issues',
    id: 12,
    img: '/game/relics/anger.svg',
    description: 'You failed your therapy sessions for anger management. Your therapist is dissapointed. When attacked, **grounded** tiles have double the chance to trigger an **earthquake.**',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Blood Thirsty',
    id: 13,
    img: '/game/relics/bat.svg',
    description: 'Every time you damage an enemy, heal **10** HP.',
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'The Sun is a Deadly Lazer',
    id: 14,
    img: '/game/relics/sun.svg',
    description: "Don't let his cute looks decieve you, he'll fry you at the first chance he gets. Rerolling regenerates **20% more energy**.",
    unlocked: false
  },
  {
    type: 'Relic',
    name: 'Concussion',
    id: 15,
    img: '/game/relics/dizzy.svg',
    description: 'Every time you damage an enemy, empty their attack meter.',
    unlocked: false
  },
  {
    type: "Relic",
    name: "Double or Nothing",
    id: 16,
    img: "/game/mystery.svg",
    description: "Receive a random effect",
    unlocked: false
  },
  {
    type: "Relic",
    name: "Brainrot",
    id: 17,
    img: "/game/relics/brain.svg",
    description: "Unlock the skibidi aura of ohio and become the most sigma betamaxxer in the world",
    unlocked: false
  }
];

export const powerups: Powerup[] = [
  {
    type: 'Powerup',
    name: 'BAND-AID®',
    id: 0,
    img: '/game/relics/bandaid.svg',
    description: 'Heal back to full HP.',
    count: 0
  },
  {
    type: 'Powerup',
    name: 'Blue Cow (not Red Bull)',
    id: 1,
    img: '/game/relics/bluecow.png',
    description: 'Regenerater back to full energy.',
    count: 0
  },
  {
    type: 'Powerup',
    name: 'Shield',
    id: 2,
    img: '/game/relics/shield.svg',
    description: 'Block the next enemy attack.',
    count: 0
  },
  {
    type: 'Powerup',
    name: 'Fast Forward',
    id: 3,
    img: '/game/relics/skip.svg',
    description: 'Deal **1** life of damage to the enemy.',
    count: 0
  }
];

export const ice: Element = {
  type: 'Element',
  name: 'ice',
  img: '/game/elements/ice.svg',
  currentLevel: 1,
  levels: [
    {
      level: 1,
      name: '0° Celsius',
      description: '**Freeze** a tile. When rerolling, **frozen** tiles will not be rerolled. **Frozen** tiles will thaw after 1 reroll.'
    },
    {
      level: 2,
      name: 'Canada',
      description: '**Frozen** tiles will have a chance to not thaw out based on the number of adjacent **frozen** tiles.'
    },
    {
      level: 3,
      name: 'Hot 😏',
      description:
        "You've been working on your charisma, and now you're hotter than the sun. **Frozen** tiles will never thaw out naturally, but you can also reselect **frozen** tiles to manually thaw them out at no additional cost."
    },
    {
      level: 4,
      name: 'Слава Советскому Союзу!',
      description:
        'The ghost of Joseph Stalin has seen your plight and has called in **General Winter** to aid in your battle. Every 3 rerolls, **General Winter** will **freeze** a random tile that has not been frozen yet.'
    }
  ]
};

export const fire: Element = {
  type: 'Element',
  name: 'fire',
  img: '/game/elements/fire.svg',
  currentLevel: 0,
  levels: [
    {
      level: 1,
      name: 'Farenheit 451',
      description:
        '**Burn** a tile. When rerolling, **burning** tiles will heal **0.1** max HP each. If **2** adjacent tiles are **burning**, all **burning** tiles will explode and return to a **normal** state. You will take **25** damage from the resulting second-degree burns.'
    },
    {
      level: 2,
      name: 'Demolition',
      description:
        '**Burning** tiles will spread **fire** to adjacent tiles every **3** rerolls, and the threshold for an explosion is increased to **4** adjacent tiles. However, **burning** tiles will only heal **0.05** max HP each.'
    },
    {
      level: 3,
      name: 'Workplace Safety',
      description: '**Burning** tiles will no longer explode, but **burning** tiles will only heal **0.033** max HP each.'
    },
    {
      level: 4,
      name: 'Arson',
      description:
        "Your inner arsonist emerges, and you begin to set the world on fire. Every 3 rerolls, a random non-**burning** tiles will be set on **fire**. The max HP healed per **burning** tile is increased back to **0.1** HP, but **burning** a tile will now cost **7.5** energy because fire and electricity don't go well together."
    }
  ]
};

export const air: Element = {
  type: 'Element',
  name: 'air',
  img: '/game/elements/air.svg',
  currentLevel: 0,
  levels: [
    {
      level: 1,
      name: 'Yeet',
      description: '**Yeet** a number from the **enemy board**, swapping it out with a new random number.'
    },
    {
      level: 2,
      name: 'Bigger Yeet',
      description: 'Your arms are stronger. **Yeeting** a number will now have a 25% chance of **yeeting** adjacent tiles.'
    },
    {
      level: 3,
      name: 'Gym Bro',
      description:
        'You finally went to the gym with your free gym membership. The chance to **yeet** adjacent tiles has increased to 50%. When adjacent tiles are **yeeted**, there is now also a 25% chance to **yeet** their adjacent tiles.'
    },
    {
      level: 4,
      name: 'Word? 🤨',
      description:
        'You consumed some weird substances and now you feel like you can lift a mountain. The chance to **yeet** adjacent tiles has increased to 100%. Adjacent tiles continue to have a chance to be **yeeted**, halving every tile (50% → 25% → 12.5%…)'
    }
  ]
};

export const earth: Element = {
  type: 'Element',
  name: 'earth',
  img: '/game/elements/earth.svg',
  currentLevel: 0,
  levels: [
    {
      level: 1,
      name: 'My Valorant RR',
      description: '**Ground** a tile. **Grounded** tiles can only change by at most ±1 each reroll. **Grounded** tiles will shatter at the end of each turn and return to a **normal** state.'
    },
    {
      level: 2,
      name: "Peeker's Advantage",
      description: 'Each **grounded** tile grants +1 **defense** to incoming damage. **Defense** decreases incoming damage by 1, but you will still take a minimum of 1 damage from damage sources.'
    },
    {
      level: 3,
      name: 'I rack',
      description: '**Grounded** tiles will create a dust storm. Enemies have up to a 50% chance to miss their attacks, scaling with how many **grounded** tiles there are.'
    },
    {
      level: 4,
      name: 'Ur mom',
      description:
        'When attacked, there is up to a 25% chance to trigger an **earthquake**. **Earthquakes** will stun the enemy for up to 5 turns. **Earthquake** chance and stun duration scale with how many **grounded** tiles there are.'
    }
  ]
};

export function formatDescription(description: string) {
  const parts = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(description)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: description.slice(lastIndex, match.index), bold: false });
    }

    parts.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < description.length) {
    parts.push({ text: description.slice(lastIndex), bold: false });
  }

  return parts;
}
