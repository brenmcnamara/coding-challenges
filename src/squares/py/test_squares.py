from squares import squares
from test_utils import visual_to_board

import unittest


class TestSquares(unittest.TestCase):

    def test_board_with_no_lines(self):
        board1 = visual_to_board("""
            * * *

            * * *

            * * *
        """)
        self.assertEqual(squares(board1), {1: 0, 2: 0})

        board2 = visual_to_board("""
            *
        """)
        self.assertEqual(squares(board2), {})

    def test_board_with_no_lines_forming_squares(self):
        board1 = visual_to_board("""
            *-*
            |
            * *
        """)
        self.assertEqual(squares(board1), {1: 0})

        board2 = visual_to_board("""
            *-*-*-*
            |   |
            * * *-*
              | |
            * *-*-*
            | |   |
            * * *-*
        """)
        self.assertEqual(squares(board2), {1: 0, 2: 0, 3: 0})

    def test_identifies_squares_of_size_1(self):
        board1 = visual_to_board("""
            *-*-*
            |
            *-*-*
            | | |
            * *-*
        """)
        self.assertEqual(squares(board1), {1: 1, 2: 0})

        board2 = visual_to_board("""
            * * * *
            | | |
            * *-*-*
              | | |
            *-*-*-*
            | |   |
            *-* * *
        """)
        self.assertEqual(squares(board2), {1: 3, 2: 0, 3: 0})

    def test_identifies_squares_of_size_2(self):
        board1 = visual_to_board("""
            *-*-* *
            |   |
            * * * *
            |   |
            *-*-* *

            * * * *
        """)
        self.assertEqual(squares(board1), {1: 0, 2: 1, 3: 0})

        board2 = visual_to_board("""
            *-*-* * *
            |   |
            * * * * *
            |   |
            *-*-*-*-*
                |   |
            * * * * *
                |   |
            * * *-*-*
        """)
        self.assertEqual(squares(board2), {1: 0, 2: 2, 3: 0, 4: 0})

    def test_identifies_squares_of_mixed_sizes(self):
        board1 = visual_to_board("""
            *-*-* *
            | | |
            * *-*-*
            | | | |
            *-*-*-*

            * * * *
        """)
        self.assertEqual(squares(board1), {1: 3, 2: 1, 3: 0})

        board2 = visual_to_board("""
            *-*-*-* *
            |     |
            * *-*-* *
            | |   |
            * * *-*-*
            | | | | |
            *-*-*-* *
            |   |   |
            * * *-*-*
        """)
        self.assertEqual(squares(board2), {1: 1, 2: 2, 3: 1, 4: 0})

    def test_idenfities_full_board_squares(self):
        board1 = visual_to_board("""
            *-*-*-*
            |     |
            * * * *
            |     |
            * * * *
            |     |
            *-*-*-*
        """)
        self.assertEqual(squares(board1), {1: 0, 2: 0, 3: 1})

        board2 = visual_to_board("""
            *-*-*
            |   |
            * * *
            |   |
            *-*-*
        """)
        self.assertEqual(squares(board2), {1: 0, 2: 1})


if __name__ == '__main__':
    unittest.main()
