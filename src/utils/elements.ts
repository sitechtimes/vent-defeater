export type Element = {
  name: 'ice' | 'fire' | 'air' | 'earth';
  img: string;
  levels: {
    level: number;
    description: string;
  }[];
};

export const ice: Element = {
  name: 'ice',
  img: '/game/elements/ice.svg',
  levels: [
    {
      level: 1,
      description: '**Freeze** a tile. When rerolling, **frozen** tiles will not be rerolled. **Frozen** tiles will thaw after 1 reroll.'
    },
    {
      level: 2,
      description: '**Frozen** tiles will have a chance to not thaw out if there is an adjacent **frozen** tile.'
    },
    {
      level: 3,
      description: '**Frozen** tiles will now never thaw out naturally, and will now **freeze** adjacent **burning** tiles.'
    },
    {
      level: 4,
      description: 'The ice from **frozen** tiles have become self-aware, spreading to all adjacent tiles no matter the element.'
    }
  ]
};

export const fire: Element = {
  name: 'fire',
  img: '/game/elements/fire.svg',
  levels: [
    {
      level: 1,
      description:
        '**Burn** a tile. When rerolling, **burning** tiles will deal no damage to you. If **3** adjacent tiles are **burning**, they will explode and return to a **normal** state. You will take **25** damage from the resulting second-degree burns.'
    },
    {
      level: 2,
      description: '**Burning** tiles will spread **fire** to adjacent tiles every **3** rerolls, and the threshold for an explosion is increased to **10** adjacent tiles.'
    },
    {
      level: 3,
      description: '**Burning** tiles will no longer explode, and will turn adjacent **grounded** tiles into **burning** tiles as well.'
    },
    {
      level: 4,
      description: 'Your inner arsonist emerges, and you begin to set the world on fire. Every 10 rerolls, the outermost non-**burning** tiles will be set on **fire**.'
    }
  ]
};

export const air: Element = {
  name: 'air',
  img: '/game/elements/air.svg',
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

export const earth: Element = {
  name: 'earth',
  img: '/game/elements/earth.svg',
  levels: [
    {
      level: 1,
      description: '**Yeet** a number from the enemy board, swapping it out with a new random number.'
    },
    {
      level: 2,
      description: 'Your arms are stronger. **Yeeting** a number will now have a 10% chance of **yeeting** adjacent tiles.'
    },
    {
      level: 3,
      description:
        'You finally went to the gym with your free gym membership. The chance to **yeet** adjacent tiles has increased to 25%. When adjacent tiles are **yeeted**, there is now also a 5% chance to **yeet** their adjacent tiles.'
    },
    {
      level: 4,
      description:
        'You consumed some weird substances and now you can lift mountains. The chance to **yeet** adjacent tiles has increased to 50%. When adjacent tiles are **yeeted**, they now have a 20% chance to **yeet** their adjacent tiles. When these adjacent tiles are **yeeted**, they have a 5% chance to **yeet** their adjacent tiles as well.'
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
