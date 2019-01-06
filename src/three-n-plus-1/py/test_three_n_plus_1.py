from three_n_plus_1 import algo

import unittest


class TestThreeNPlus1(unittest.TestCase):

    def test_1_to_10(self):
        self.assertEqual(algo(1, 10), 20)

    def test_100_to_200(self):
        self.assertEqual(algo(100, 200), 125)

    def test_201_to_210(self):
        self.assertEqual(algo(201, 210), 89)

    def test_900_to_1000(self):
        self.assertEqual(algo(900, 1000), 174)

    def test_raises_error_when_lo_is_gte_hi(self):
        with self.assertRaises(ValueError):
            algo(10, 1)


if __name__ == '__main__':
    unittest.main()
