export type Element = {
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

export const ice: Element = {
  name: 'ice',
  img: '/game/elements/ice.svg',
  currentLevel: 0,
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
  name: 'air',
  img: '/game/elements/air.svg',
  currentLevel: 4,
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
  name: 'earth',
  img: '/game/elements/earth.svg',
  currentLevel: 4,
  levels: [
    {
      level: 1,
      name: 'My Valorant RR',
      description: '**Ground** a tile. **Grounded** tiles can only change by at most ±1 each reroll.'
    },
    {
      level: 2,
      name: "Peeker's Advantage",
      description: 'Each **grounded** tile grants +1 defense to incoming damage.'
    },
    {
      level: 3,
      name: 'tbd',
      description: '**Grounded** tiles create a dust storm. Enemies have a chance to miss their attacks, scaling with how many **grounded** tiles there are.'
    },
    {
      level: 4,
      name: 'Ur mom',
      description:
        'When attacked, there is a chance to trigger an earthquake. This will empty the action bars of all enemies and stun them. Earthquake chance and stun duration scale with how many **grounded** tiles there are. Half of all **grounded** tiles will be freed afterwards.'
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
