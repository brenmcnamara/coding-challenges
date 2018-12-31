/* @flow */

export type Board = {|
  +hMatrix: Array<Array<boolean>>, // row-major, size x (size - 1)
  +size: number,
  +vMatrix: Array<Array<boolean>>, // row-major, (size - 1) x size
|};

export default function squares(board: Board): Map<number, number> {
  const map = new Map();
  // i represents the size of the square we are checking. We will check for the
  // existence of squares of size i, then continue iterating to larger sizes
  // until we reach the max size of any square that can exist on the board.
  for (let i = 1; i < board.size; ++i) {
    let count = 0;

    // j represents the starting row we want to check for the squares. We will
    // check for squares of size i that start on row j.
    for (let j = 0; j < board.size - i; ++j) {
      // k represents the starting column we want to check for the squares.
      // Given the size of the squares (i) and the starting row of the
      // squares (j), we need to pick the column that we are inspecting for
      // squares (k).
      for (let k = 0; k < board.size - i; ++k) {
        // In this loop we are testing for the existence of a specific square.
        // We need to query the hMatrix and vMatrix to see if this square
        // exists.
        if (_checkIfSquareExists(board, i, j, k)) {
          count += 1;
        }
      }
    }
    map.set(i, count);
  }

  return map;
}

function _checkIfSquareExists(
  board: Board,
  size: number,
  row: number,
  col: number,
): boolean {
  const { hMatrix, vMatrix } = board;

  // Check the top and bottom rows for all the necessary horizontal lines.
  for (let i = row; i < row + size; ++i) {
    if (!vMatrix[i][col] || !vMatrix[i][col + size]) {
      return false;
    }
  }

  // Check the first and last columns for all the necessary vertical lines.
  for (let i = col; i < col + size; ++i) {
    if (!hMatrix[row][i] || !hMatrix[row + size][i]) {
      return false;
    }
  }

  return true;
}
