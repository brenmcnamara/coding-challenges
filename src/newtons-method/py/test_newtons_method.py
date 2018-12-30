from newtons_method import newtons_method

import math
import unittest


def x_squared_minus_5(x):
    return x * x - 5


def deriv_of_x_squared_minus_5(x):
    return 2 * x


class TestNewtonsMethod(unittest.TestCase):

    def test_approximation_of_x_squared_minus_5_equals_0(self):
        x = newtons_method(x_squared_minus_5, deriv_of_x_squared_minus_5, 0)
        self.assertAlmostEquals(x, math.sqrt(5))

    def test_approximation_of_x_squared_minus_5_equals_minus_1(self):
        x = newtons_method(x_squared_minus_5, deriv_of_x_squared_minus_5, -1)
        self.assertAlmostEquals(x, 2)


if __name__ == '__main__':
    unittest.main()
