/* @flow */

import type { Board } from './Board';
import type { Deck, DiscardPile, Hand } from './Cards';

/**
 * A base class for a player in the dominion game.
 *
 * @class
 */
export default class Player {
  deck: Deck;
  discardPile: DiscardPile;
  hand: Hand;

  constructor(deck: Deck) {
    this.deck = deck;
    this.discardPile = [];
  }

  // ---------------------------------------------------------------------------
  //
  // DO NOT OVERRIDE
  //
  // ---------------------------------------------------------------------------

  /**
   * The player draws n cards from their deck to their hand. If they run out of
   * cards from their deck, the discard pile will turn into the deck, and the
   * player will draw the remaining cards from the deck. It is possible that
   * the player has fewer than n cards that can be drawn, which will result
   * in the remaining cards showing up in the player's hand.
   *
   * NOTE: This method mutates the state of the Player object.
   */
  draw(n: number): void {
    throw Error('IMPLEMEMENT ME!');
  }

  // ---------------------------------------------------------------------------
  //
  // MUST OVERRIDE
  //
  // ---------------------------------------------------------------------------
  onMyTurn(board: Board): void {
    throw Error('Subclasses of Player must override "onMyTurn"');
  }
}
