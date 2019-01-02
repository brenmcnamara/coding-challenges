import squares from '../squares';

import { visualToBoard } from '../test-utils';

test('Boards with no lines have no squares', () => {
  const board1 = visualToBoard(`
    *
  `);
  expect(squares(board1)).toEqual(new Map());

  const board2 = visualToBoard(`
    * * * *

    * * * *

    * * * *

    * * * *
  `);
  expect(squares(board2)).toEqual(new Map([[1, 0], [2, 0], [3, 0]]));
});

test('Boards with no lines forming squares has no squares', () => {
  const board1 = visualToBoard(`
    *-*
    |
    * *
  `);

  expect(squares(board1)).toEqual(new Map([[1, 0]]));

  const board2 = visualToBoard(`
    *-*-*-*
    |   |
    * * *-*
      | |
    * *-*-*
    | |   |
    * * *-*
  `);
  expect(squares(board2)).toEqual(new Map([[1, 0], [2, 0], [3, 0]]));
});

test('Identifies squares of size 1', () => {
  const board1 = visualToBoard(`
    *-*-*
    |
    *-*-*
    | | |
    * *-*
  `);
  expect(squares(board1)).toEqual(new Map([[1, 1], [2, 0]]));

  const board2 = visualToBoard(`
    * * * *
    | | |
    * *-*-*
      | | |
    *-*-*-*
    | |   |
    *-* * *
  `);
  expect(squares(board2)).toEqual(new Map([[1, 3], [2, 0], [3, 0]]));
});

test('Identifies squares of size 2', () => {
  const board1 = visualToBoard(`
    *-*-* *
    |   |
    * * * *
    |   |
    *-*-* *

    * * * *
  `);
  expect(squares(board1)).toEqual(new Map([[1, 0], [2, 1], [3, 0]]));

  const board2 = visualToBoard(`
    *-*-* * *
    |   |
    * * * * *
    |   |
    *-*-*-*-*
        |   |
    * * * * *
        |   |
    * * *-*-*
  `);

  expect(squares(board2)).toEqual(new Map([[1, 0], [2, 2], [3, 0], [4, 0]]));
});

test('Identifies squares of mixed sizes', () => {
  const board1 = visualToBoard(`
    *-*-* *
    | | |
    * *-*-*
    | | | |
    *-*-*-*

    * * * *
  `);
  expect(squares(board1)).toEqual(new Map([[1, 3], [2, 1], [3, 0]]));

  const board2 = visualToBoard(`
    *-*-*-* *
    |     |
    * *-*-* *
    | |   |
    * * *-*-*
    | | | | |
    *-*-*-* *
    |   |   |
    * * *-*-*
  `);
  expect(squares(board2)).toEqual(new Map([[1, 1], [2, 2], [3, 1], [4, 0]]));
});

test('Identifies full board squares', () => {
  const board1 = visualToBoard(`
    *-*-*-*
    |     |
    * * * *
    |     |
    * * * *
    |     |
    *-*-*-*
  `);
  expect(squares(board1)).toEqual(new Map([[1, 0], [2, 0], [3, 1]]));

  const board2 = visualToBoard(`
    *-*-*
    |   |
    * * *
    |   |
    *-*-*
  `);
  expect(squares(board2)).toEqual(new Map([[1, 0], [2, 1]]));
});
