import {
  generateGameTree,
  getLeafCount,
  getMaxDepth,
  getMinDepth,
  getPerfectGameStatus,
  getNodeCount,
} from '../tic-tac-toe-solver';
import { visualToBitmap } from '../test-utils';

const INITIAL_BOARD_STATE = { xMask: 0, oMask: 0 };

const gameTree = generateGameTree(INITIAL_BOARD_STATE, 'x');

test('Max depth of game with winner is 0', () => {
  const board = visualToBitmap(`
  | x | o | o |
  -------------
  | - | x | - |
  -------------
  | - | - | x |
  `);
  const tree = generateGameTree(board, 'o');
  expect(getMaxDepth(tree)).toBe(0);
});

test('Max depth of single node is 0', () => {
  const board = visualToBitmap(`
  | x | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);
  const tree = generateGameTree(board, 'o');
  expect(getMaxDepth(tree)).toBe(0);
});

test('Max depth with 2 moves left is 2', () => {
  const board = visualToBitmap(`
  | - | x | o |
  -------------
  | - | x | x |
  -------------
  | x | o | o |
  `);
  const tree = generateGameTree(board, 'o');
  expect(getMaxDepth(tree)).toBe(2);
});

test('Max depth of entire game tree is 9', () => {
  expect(getMaxDepth(gameTree)).toBe(9);
});

test('Min depth of game with winner is 0', () => {
  const board = visualToBitmap(`
  | x | o | o |
  -------------
  | - | x | - |
  -------------
  | - | - | x |
  `);
  const tree = generateGameTree(board, 'o');
  expect(getMinDepth(tree)).toBe(0);
});

test('Min depth of tree with 1 move to win is 1', () => {
  const board = visualToBitmap(`
  | x | o | o |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `);
  const tree = generateGameTree(board, 'x');
  expect(getMinDepth(tree)).toBe(1);
});

test('Min depth of entire game tree is 5', () => {
  expect(getMinDepth(gameTree)).toBe(5);
});

test('Node count of single node is 1', () => {
  const board = visualToBitmap(`
  | x | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);
  const tree = generateGameTree(board, 'o');
  expect(getNodeCount(tree)).toBe(1);
});

test('Node count includes self and immediate children', () => {
  const board = visualToBitmap(`
  | - | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);
  const tree = generateGameTree(board, 'x');
  expect(getNodeCount(tree)).toBe(2);
});

test('Node count of entire game is 549946', () => {
  expect(getNodeCount(gameTree)).toBe(549946);
});

test('Leaf count of leaf node is 1', () => {
  const board = visualToBitmap(`
  | x | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);

  const tree = generateGameTree(board, 'o');
  expect(getLeafCount(tree)).toBe(1);
});

test('Leaf count of node with single leaf is 1', () => {
  const board = visualToBitmap(`
  | - | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);
  const tree = generateGameTree(board, 'x');
  expect(getLeafCount(tree)).toBe(1);
});

test('Leaf count of entire game tree is 255168', () => {
  expect(getLeafCount(gameTree)).toBe(255168);
});

test('Perfect game of leaf node is the game status of the leaf', () => {
  const board = visualToBitmap(`
  | x | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);

  const tree = generateGameTree(board, 'o');
  expect(getPerfectGameStatus(tree, 'o')).toBe('TIE_GAME');
});

test('Perfect game of node with single leaf is the game status of the leaf', () => {
  const board = visualToBitmap(`
  | - | x | o |
  -------------
  | o | x | x |
  -------------
  | x | o | o |
  `);

  const tree = generateGameTree(board, 'x');
  expect(getPerfectGameStatus(tree, 'x')).toBe('TIE_GAME');
});

test('Perfect game of entire game tree is tie game', () => {
  expect(getPerfectGameStatus(gameTree, 'x')).toBe('TIE_GAME');
});

test('Identifies a game where x will be the winner in 1 turn', () => {
  const board = visualToBitmap(`
  | x | o | o |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `);

  const tree = generateGameTree(board, 'x');
  expect(getPerfectGameStatus(tree, 'x')).toBe('X_WINS');
});

test('Identifies a game where o will be the winner in 1 turn', () => {
  const board = visualToBitmap(`
  | x | o | - |
  -------------
  | x | x | o |
  -------------
  | - | x | o |
  `);

  const tree = generateGameTree(board, 'o');
  expect(getPerfectGameStatus(tree, 'o')).toBe('O_WINS');
});

test('Identifies a game where x will be the winner after multiple turns', () => {
  const board = visualToBitmap(`
  | - | o | - |
  -------------
  | - | x | - |
  -------------
  | - | - | - |
  `);

  const tree = generateGameTree(board, 'x');
  expect(getPerfectGameStatus(tree, 'x')).toBe('X_WINS');
});
