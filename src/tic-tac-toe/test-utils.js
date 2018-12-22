/* @flow */

import type { BoardState, MoveMask } from './tic-tac-toe';

export function visualToBitmap(visual: string): BoardState {
  const chars = visual
    .replace(/[ |]/g, '')
    .split('\n')
    .filter((_, i) => i % 2 === 1)
    .join('');
  const createReducer = (symbol: string) => (mask, char, i) =>
    char === symbol ? mask | (1 << i) : mask;

  const xMask = Array.prototype.reduce.call(chars, createReducer('x'), 0);
  const oMask = Array.prototype.reduce.call(chars, createReducer('o'), 0);
  return { xMask, oMask };
}

export function bitmapToVisual(board: BoardState): string {
  const row1 = `| ${s(board, 0, 0)} | ${s(board, 0, 1)} | ${s(board, 0, 2)} |`;
  const row2 = `| ${s(board, 1, 0)} | ${s(board, 1, 1)} | ${s(board, 1, 2)} |`;
  const row3 = `| ${s(board, 2, 0)} | ${s(board, 2, 1)} | ${s(board, 2, 2)} |`;

  return `
  ${row1}
  -------------
  ${row2}
  -------------
  ${row3}
  `;
}

function s(board: BoardState, row: number, col: number): string {
  const mask = 1 << ((row * 3) + col);
  if ((board.xMask & mask) !== 0) {
    return 'x';
  } else if ((board.oMask & mask) !== 0) {
    return 'o';
  }
  return '-';
}
