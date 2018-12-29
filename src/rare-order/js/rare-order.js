/* @flow */

import nullthrows from 'nullthrows';

type Char = string;

/**
 * Given a list of words in "alphabetical" order, determine the ordering of
 * the alphabet. We assume that the characters in the words contain the full
 * alphabet of all possible characters.
 *
 * In the case that the ordering is non-deterministic (meaning there is more
 * than 1 ordering that can satisfy the alpbabet), than a list of all possible
 * orderings will be returned.
 *
 * In the case that the words are sorted in an impossible order (such that
 * no ordering can possibly satisfy the list of words), an error is thrown.
 *
 * If an empty list of words is provided, an error is thrown.
 */
export default function rareOrder(words: Array<string>): string {
  if (words.length === 0) {
    throw Error('rareOrder requires at least 1 word to perform ordering');
  }

  const orderMap = _createOrderMap(words);
  const ordering = new Array(orderMap.size);
  let pointer = orderMap.size - 1;

  // Iterate through the characters, find the character with an empty set, then
  // add that to the end of the list and remove it from the set of all other
  // characters. This will run in O(n^2) where n is the number of chars that
  // need to be ordered.
  while (orderMap.size) {

    let didFindEmptySet = false;
    for (let [key, set] of orderMap.entries()) {
      if (set.size === 0) {
        didFindEmptySet = true;
        ordering[pointer] = key;
        --pointer;
        orderMap.delete(key);

        // Go through all other sets and remove the key from those sets.
        for (let otherSet of orderMap.values()) {
          if (otherSet.size === 0) {
            throw Error('Non-Deterministic ordering');
          }
          otherSet.delete(key);
        }
        break;
      }
    }
    if (!didFindEmptySet) {
      throw Error('Bad ordering');
    }
  }

  return ordering.join('');
}

/**
 * Generates a DAG showing the ordering of the characters.
 */
function _createOrderMap(words: Array<string>): Map<Char, Set<Char>> {
  const orderMap = new Map();

  _registerCharsFromWord(orderMap, words[0]);

  for (let i = 1; i < words.length; ++i) {
    const word1 = words[i - 1];
    const word2 = words[i];

    _registerCharsFromWord(orderMap, word2);

    // Extract ordering information from the pair of words.
    for (let j = 0; j < Math.min(word1.length, word2.length); ++j) {
      const char1 = word1.charAt(j);
      const char2 = word2.charAt(j);
      if (char1 !== char2) {
        if (!orderMap.has(char1)) {
          orderMap.set(char1, new Set([char2]));
        } else {
          nullthrows(orderMap.get(char1)).add(char2);
        }
        break;
      }
    }
  }
  return orderMap;
}

function _registerCharsFromWord(
  orderMap: Map<Char, Set<Char>>,
  word: string,
): void {
  if (word.length === 0) {
    throw Error('Cannot use empty strings as words');
  }

  for (let char of word) {
    if (!orderMap.has(char)) {
      orderMap.set(char, new Set());
    }
  }
}
