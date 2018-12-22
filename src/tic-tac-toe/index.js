/* @flow */

/* eslint-disable no-console */

import chalk from 'chalk';
import inquirer from 'inquirer';
import nullthrows from 'nullthrows';

import { applyMove, getGameStatus, getMoves, Move } from './tic-tac-toe';
import { bitmapToVisual } from './test-utils';
import { generateGameTree, getPerfectGameStatus } from './tic-tac-toe-solver';

import type { BoardState, MoveMask } from './tic-tac-toe';
import type { GameNode } from './tic-tac-toe-solver';

const INITIAL_GAME_BOARD = { xMask: 0, oMask: 0 };

async function main() {
  console.log(chalk.green('Initializing tic tac toe!'));

  let board = INITIAL_GAME_BOARD;
  let activePlayer = 'o';
  let gameStatus = 'GAME_NOT_OVER';

  const difficulty = await promptDifficulty();
  const userPlayer = await promptPlayer();
  const ai = difficulty === 'EASY' ? createEasyGameAI() : createHardGameAI();

  while (gameStatus === 'GAME_NOT_OVER') {
    activePlayer = activePlayer === 'x' ? 'o' : 'x';

    if (activePlayer === userPlayer) {
      console.log(chalk.green('Your turn!'));
      const move = await promptMove(board);
      board = applyMove(board, move, activePlayer);
    } else {
      console.log(chalk.green('My turn!'));
      const move = ai(board, activePlayer);
      console.log(chalk.green('Making move: ' + stringifyMove(move)));
      board = applyMove(board, move, activePlayer);
    }

    gameStatus = getGameStatus(board);
    console.log(bitmapToVisual(board));
  }

  console.log('Game over');
  console.log(gameStatus);
}

main();

// -----------------------------------------------------------------------------
//
// STRATEGIES
//
// -----------------------------------------------------------------------------

function createEasyGameAI() {
  return (board: BoardState, turn: 'x' | 'o'): MoveMask => {
    const possibleMoves = Array.from(getMoves(board));
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const randomMove = possibleMoves[randomIndex];
    return randomMove;
  };
}

function createHardGameAI() {
  return (board: BoardState, turn: 'x' | 'o'): MoveMask => {
    const tree = generateGameTree(board, turn);
    return findOptimalMove(tree, turn);
  };

  function findOptimalMove(tree: GameNode, turn: 'x' | 'o'): MoveMask {
    if (tree.edges.length === 0) {
      throw Error('Trying to get optimal move of terminal game state');
    }

    let losingMove = null;
    let tieMove = null;

    const nextTurn = turn === 'x' ? 'o' : 'x';

    for (let edge of tree.edges) {
      const status = getPerfectGameStatus(edge.node, nextTurn);
      const isWinningStatus =
        (status === 'X_WINS' && turn === 'x') ||
        (status === 'O_WINS' && turn === 'o');
      if (isWinningStatus) {
        return edge.move;
      } else if (status === 'TIE_GAME') {
        tieMove = edge.move;
      } else {
        losingMove = edge.move;
      }
    }

    return nullthrows(tieMove || losingMove);
  }
}
// -----------------------------------------------------------------------------
//
// UTILITIES
//
// -----------------------------------------------------------------------------

type Difficulty = 'EASY' | 'HARD';

async function promptPlayer(): Promise<'x' | 'o'> {
  const result = await inquirer.prompt([
    {
      type: 'list',
      name: 'player',
      message: 'Play as x or o?',
      choices: ['x', 'o'],
    },
  ]);
  return result.player;
}

async function promptDifficulty(): Promise<Difficulty> {
  const result = await inquirer.prompt([
    {
      type: 'list',
      name: 'difficulty',
      message: 'Pick Difficulty:',
      choices: ['EASY', 'HARD'],
    },
  ]);
  return result.difficulty;
}

async function promptMove(board: BoardState): Promise<MoveMask> {
  const possibleMoves = getMoves(board);

  let move = null;
  let isFirstPass = true;

  while (!move) {
    if (!isFirstPass) {
      console.log(chalk.red('Invalid move!'));
    }
    isFirstPass = false;

    const result = await inquirer.prompt([
      { type: 'input', name: 'move', message: 'Make your move: ' },
    ]);

    move = parseMove(result.move);
    if (move && !possibleMoves.has(move)) {
      move = null;
    }
  }
  return move;
}

function parseMove(moveStr: string): MoveMask | null {
  const [rowSerial, colSerial, ...junk] = moveStr.split(',');
  if (junk.length !== 0) {
    return null;
  }
  const row = parseInt(rowSerial, 10);
  const col = parseInt(colSerial, 10);

  if (Number.isNaN(row) || Number.isNaN(col)) {
    return null;
  }

  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return null;
  }

  return Move(row, col);
}

function stringifyMove(move: MoveMask): string {
  switch (move) {
    case 0b000000001:
      return '(0, 0)';
    case 0b000000010:
      return '(0, 1)';
    case 0b000000100:
      return '(0, 2)';
    case 0b000001000:
      return '(1, 0)';
    case 0b000010000:
      return '(1, 1)';
    case 0b000100000:
      return '(1, 2)';
    case 0b001000000:
      return '(2, 0)';
    case 0b010000000:
      return '(2, 1)';
    case 0b100000000:
      return '(2, 2)';

    default:
      throw Error('Invalid move mask');
  }
}
