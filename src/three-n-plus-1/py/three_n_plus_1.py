
def algo(lo, hi):
    if hi < lo:
        raise ValueError('hi cannot be larger than lo')

    max_iter = float('-inf')
    for i in range(lo, hi + 1):
        max_iter = max(max_iter, count_iter(i))
    return max_iter


def count_iter(n):
    iter = 1
    while n != 1:
        if n % 2 == 1:
            n = 3 * n + 1
        else:
            n = n / 2
        iter = iter + 1
    return iter
