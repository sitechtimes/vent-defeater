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
    /** Description of the level */
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
      description: '**Freeze** a tile. When rerolling, **frozen** tiles will not be rerolled. **Frozen** tiles will thaw after 1 reroll.'
    },
    {
      level: 2,
      description: '**Frozen** tiles will have a chance to not thaw out based on the number of adjacent **frozen** tiles.'
    },
    {
      level: 3,
      description:
        '**Frozen** tiles will now never thaw out naturally, and will now **freeze** adjacent **burning** tiles. You can now also reselect **frozen** tiles to manually thaw them out at no additional cost.'
    },
    {
      level: 4,
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
      description:
        '**Burn** a tile. When rerolling, **burning** tiles will heal **0.1** max HP each, up to a maximum of **5** HP per level. If **3** adjacent tiles are **burning**, they will explode and return to a **normal** state. You will take **25** damage from the resulting second-degree burns.'
    },
    {
      level: 2,
      description:
        '**Burning** tiles will spread **fire** to adjacent tiles every **3** rerolls, and the threshold for an explosion is increased to **10** adjacent tiles. The max HP heal limit is also increased to **10** HP per level.'
    },
    {
      level: 3,
      description:
        '**Burning** tiles will no longer explode, and will turn adjacent **grounded** tiles into **burning** tiles as well. The max HP heal limit is further increased to **15** HP per level.'
    },
    {
      level: 4,
      description:
        'Your inner arsonist emerges, and you begin to set the world on fire. Every 10 rerolls, the outermost non-**burning** tiles will be set on **fire**. The HP healed per **burning** tile is increased to **0.2** HP, and the max HP heal limit is now **20** HP per level.'
    }
  ]
};

export const air: Element = {
  name: 'air',
  img: '/game/elements/air.svg',
  currentLevel: 0,
  levels: [
    {
      level: 1,
      description: '**Yeet** a number from the **enemy board**, swapping it out with a new random number.'
    },
    {
      level: 2,
      description: 'Your arms are stronger. **Yeeting** a number will now have a 25% chance of **yeeting** adjacent tiles.'
    },
    {
      level: 3,
      description:
        'You finally went to the gym with your free gym membership. The chance to **yeet** adjacent tiles has increased to 50%. When adjacent tiles are **yeeted**, there is now also a 25% chance to **yeet** their adjacent tiles.'
    },
    {
      level: 4,
      description:
        'You consumed some weird substances and now you can lift mountains. The chance to **yeet** adjacent tiles has increased to 100%. Adjacent tiles continue to have a chance to be **yeeted**, halving every tile (50% → 25% → 12.5%…)'
    }
  ]
};

export const earth: Element = {
  name: 'earth',
  img: '/game/elements/earth.svg',
  currentLevel: 0,
  levels: [
    {
      level: 1,
      description: '**Ground** a tile. **Grounded** tiles can only change by at most ±1 each reroll. **Grounded** tiles cannot become **frozen**.'
    },
    {
      level: 2,
      description: 'Each **grounded** tile grants +1 defense to incoming damage.'
    },
    {
      level: 3,
      description: '**Grounded** tiles create a dust storm. Enemies have a chance to miss their attacks, scaling with how many **grounded** tiles there are.'
    },
    {
      level: 4,
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
