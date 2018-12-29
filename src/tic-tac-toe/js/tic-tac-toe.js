/* @flow */

export type BoardState = {
  xMask: number,
  oMask: number,
};

export type GameStatus = 'X_WINS' | 'O_WINS' | 'TIE_GAME' | 'GAME_NOT_OVER';

export type MoveMask = number;

const WIN_MASK = [
  0b111000000,
  0b000111000,
  0b000000111,
  0b100100100,
  0b010010010,
  0b001001001,
  0b100010001,
  0b001010100,
];

export function getGameStatus(board: BoardState): GameStatus {
  if (WIN_MASK.some(mask => (board.xMask & mask) === mask)) {
    return 'X_WINS';
  } else if (WIN_MASK.some(mask => (board.oMask & mask) === mask)) {
    return 'O_WINS';
  } else if ((board.xMask | board.oMask) === 0b111111111) {
    return 'TIE_GAME';
  }
  return 'GAME_NOT_OVER';
}

export function Move(row: number, col: number): MoveMask {
  const shift = row * 3 + col;
  return 1 << shift;
}

const ALL_MOVES = [
  Move(0, 0),
  Move(0, 1),
  Move(0, 2),
  Move(1, 0),
  Move(1, 1),
  Move(1, 2),
  Move(2, 0),
  Move(2, 1),
  Move(2, 2),
];

export function getMoves(board: BoardState): Set<MoveMask> {
  if (getGameStatus(board) !== 'GAME_NOT_OVER') {
    return new Set([]);
  }

  const occupiedSpaces = board.xMask | board.oMask;
  return new Set(ALL_MOVES.filter(move => (move & occupiedSpaces) === 0));
}

export function applyMove(
  board: BoardState,
  move: MoveMask,
  player: 'x' | 'o',
): BoardState {
  return {
    xMask: player === 'x' ? board.xMask | move : board.xMask,
    oMask: player === 'o' ? board.oMask | move : board.oMask,
  };
}
