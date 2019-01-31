/* @flow */

export type Deck = Array<Card>;
export type DiscardPile = Array<Card>;
export type Hand = Array<Card>;
export type RemovedPile = Array<Card>;

export type Card =
  | Card$Action
  | Card$Attack
  | Card$Curse
  | Card$Reaction
  | Card$Victory;

export type Card$Action = {|
  +cardType: 'ACTION',
  +cost: number,
  +displayName: string,
  +effect: Function,
  +name: string,
|};

export type Card$Attack = {|
  +cardType: 'ATTACK',
  +cost: number,
  +displayName: string,
  +effect: Function,
  +name: string,
|};

export type Card$Curse = {|
  +cardType: 'CURSE',
  +cost: number,
  +displayName: string,
  +name: string,
  +points: number,
|};

export type Card$Reaction = {|
  +cardType: 'REACTION',
  +cost: number,
  +displayName: string,
  +effect: Function,
  +name: string,
|};

export type Card$Treasure = {|
  +cardType: 'TREASURE',
  +cost: number,
  +displayName: string,
  +value: string,
|};

export type Card$Victory = {|
  +cardType: 'VICTORY',
  +cost: number,
  +displayName: string,
  +name: string,
  +points: number,
|};

export const CARDS = {
  COPPER: {
    cardType: 'TREASURE',
    cost: 0,
    displayName: 'Copper',
    name: 'COPPER',
    value: 1,
  },

  ESTATE: {
    cardType: 'VICTORY',
    cost: 3,
    displayName: 'Estate',
    name: 'ESTATE',
    points: 1,
  },
};

/**
 * Takes a deck of cards and re-arranges the order of the cards randomly. This
 * method changes the deck parameter.
 *
 * @param { Deck } deck - A shuffled deck.
 */
export function shuffle(deck: Deck): void {
  throw Error('IMPLEMENT ME!');
}

/**
 * Create a deck of cards that represents the default deck for a typical game.
 */
function createDefaultDeck(): Deck {
  throw Error('IMPLEMEMENT ME!');
}
