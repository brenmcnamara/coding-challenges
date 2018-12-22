import { applyMove, getGameStatus, getMoves, Move } from '../tic-tac-toe';
import { visualToBitmap } from '../test-utils';

test('Identifies non-terminal board state', () => {
  const board = visualToBitmap(`
  | - | - | - |
  -------------
  | o | x | - |
  -------------
  | - | - | - |
  `);

  expect(getGameStatus(board)).toBe('GAME_NOT_OVER');
});

test('Identifies x wins state', () => {
  const board = visualToBitmap(`
  | x | o | - |
  -------------
  | o | x | - |
  -------------
  | - | - | x |
  `);

  expect(getGameStatus(board)).toBe('X_WINS');
});

test('Identifies o wins state', () => {
  const board1 = visualToBitmap(`
  | o | x | - |
  -------------
  | o | x | - |
  -------------
  | o | - | x |
  `);
  expect(getGameStatus(board1)).toBe('O_WINS');

  const board2 = visualToBitmap(`
  | x | o | o |
  -------------
  | x | x | o |
  -------------
  | - | x | o |
  `);
  expect(getGameStatus(board2)).toBe('O_WINS');
});

test('Identifies win state across diagonals', () => {
  const board1 = visualToBitmap(`
  | x | - | - |
  -------------
  | o | x | - |
  -------------
  | o | - | x |
  `);

  expect(getGameStatus(board1)).toBe('X_WINS');

  const board2 = visualToBitmap(`
  | x | - | o |
  -------------
  | - | o | x |
  -------------
  | o | - | x |
  `);

  expect(getGameStatus(board2)).toBe('O_WINS');
});

test('Identifies tie game state', () => {
  const board = visualToBitmap(`
  | o | x | x |
  -------------
  | x | x | o |
  -------------
  | o | o | x |
  `);

  expect(getGameStatus(board)).toBe('TIE_GAME');
});

test('Identifies win state even when board is filled up', () => {
  const board = visualToBitmap(`
  | x | x | o |
  -------------
  | o | x | o |
  -------------
  | x | o | x |
  `);

  expect(getGameStatus(board)).toBe('X_WINS');
});

test('Identifies all possible moves', () => {
  const board1 = visualToBitmap(`
  | - | - | - |
  -------------
  | - | - | - |
  -------------
  | - | - | - |
  `);

  expect(getMoves(board1)).toEqual(
    new Set([
      Move(0, 0),
      Move(0, 1),
      Move(0, 2),
      Move(1, 0),
      Move(1, 1),
      Move(1, 2),
      Move(2, 0),
      Move(2, 1),
      Move(2, 2),
    ]),
  );

  const board2 = visualToBitmap(`
  | o | - | x |
  -------------
  | - | x | - |
  -------------
  | - | - | x |
  `);

  expect(getMoves(board2)).toEqual(
    new Set([Move(0, 1), Move(1, 0), Move(1, 2), Move(2, 0), Move(2, 1)]),
  );
});

test('No possible moves when x wins', () => {
  const board = visualToBitmap(`
  | x | o | o |
  -------------
  | - | x | - |
  -------------
  | - | - | x |
  `);
  expect(getMoves(board)).toEqual(new Set([]));
});

test('No possible moves when o wins', () => {
  const board = visualToBitmap(`
  | o | o | o |
  -------------
  | x | x | - |
  -------------
  | - | - | x |
  `);
  expect(getMoves(board)).toEqual(new Set([]));
});

test('Applies x move to board to get new board', () => {
  const board = visualToBitmap(`
  | - | - | - |
  -------------
  | - | - | - |
  -------------
  | - | - | - |
  `);

  expect(applyMove(board, Move(1, 1), 'x')).toEqual(
    visualToBitmap(`
  | - | - | - |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `),
  );
});

test('Applies o move to board to get new board', () => {
  const board = visualToBitmap(`
  | - | - | - |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `);

  expect(applyMove(board, Move(0, 0), 'o')).toEqual(
    visualToBitmap(`
  | o | - | - |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `),
  );
});
