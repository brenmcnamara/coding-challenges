import math
import random

_MIN_DIFF_BETWEEN_ITERATION = 1e-3


def newtons_method(fn, deriv, solution):
    prev_approx = float('inf')
    approx = random.uniform(0, 1)

    while abs(approx - prev_approx) > _MIN_DIFF_BETWEEN_ITERATION:
        prev_approx = approx
        approx = approx - (fn(approx) - solution) / deriv(approx)

    return approx
