/* @flow */

import { applyMove, getGameStatus, getMoves } from './tic-tac-toe';

import type { BoardState, GameStatus, MoveMask } from './tic-tac-toe';

export type GameEdge = {
  move: MoveMask,
  node: GameNode,
};

export type GameNode = {
  edges: Array<GameEdge>,
  value: BoardState,
};

export function generateGameTree(board: BoardState, turn: 'x' | 'o'): GameNode {
  return {
    edges: generateEdges(board, turn),
    value: board,
  };
}

function generateEdges(board: BoardState, turn: 'x' | 'o'): Array<GameEdge> {
  return Array.from(getMoves(board)).map(move => {
    const newBoard = applyMove(board, move, turn);
    return {
      move,
      node: {
        edges: generateEdges(newBoard, turn === 'x' ? 'o' : 'x'),
        value: newBoard,
      },
    };
  });
}

export function getMaxDepth(node: GameNode): number {
  if (node.edges.length === 0) {
    return 0;
  }
  return Math.max.apply(
    Math,
    node.edges.map(edge => getMaxDepth(edge.node) + 1),
  );
}

export function getMinDepth(node: GameNode): number {
  if (node.edges.length === 0) {
    return 0;
  }
  return Math.min.apply(
    Math,
    node.edges.map(edge => getMinDepth(edge.node) + 1),
  );
}

export function getNodeCount(node: GameNode): number {
  if (node.edges.length === 0) {
    return 1;
  }
  return node.edges.reduce((sum, edge) => sum + getNodeCount(edge.node), 1);
}

export function getLeafCount(node: GameNode): number {
  if (node.edges.length === 0) {
    return 1;
  }
  return node.edges.reduce((sum, edge) => sum + getLeafCount(edge.node), 0);
}

export function getPerfectGameStatus(
  node: GameNode,
  player: 'x' | 'o',
): GameStatus {
  if (node.edges.length === 0) {
    return getGameStatus(node.value);
  }

  let foundTieGame = false;
  const nextPlayer = player === 'x' ? 'o' : 'x';

  for (let edge of node.edges) {
    const { node: nextNode } = edge;
    const gameStatus = getPerfectGameStatus(nextNode, nextPlayer);
    if (gameStatus === 'X_WINS' && player === 'x') {
      return 'X_WINS';
    } else if (gameStatus === 'O_WINS' && player === 'o') {
      return 'O_WINS';
    } else if (gameStatus === 'TIE_GAME') {
      foundTieGame = true;
    }
  }

  return foundTieGame ? 'TIE_GAME' : player === 'x' ? 'O_WINS' : 'X_WINS';
}
