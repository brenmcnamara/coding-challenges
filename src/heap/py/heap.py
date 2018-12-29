from collections.abc import Sized


class Heap(Sized):
    def __init__(self):
        self._values = []

    def __len__(self):
        return len(self._values)

    def insert(self, value):
        self._values.append(value)
        self._sort_bottom_to_top()

    def remove(self):
        if len(self._values) is 0:
            raise IndexError('Cannot call remove() on empty Heap')

        self._swap_indices(0, len(self._values) - 1)
        self._values.pop()
        self._sort_top_to_bottom()

    def top(self):
        if len(self._values) is 0:
            raise IndexError('Cannot call top() on empty Heap')
        return self._values[0]

    def _swap_indices(self, i1, i2):
        temp = self._values[i1]
        self._values[i1] = self._values[i2]
        self._values[i2] = temp

    def _sort_top_to_bottom(self):
        current = 0
        left = _get_left_child_index(current)
        right = _get_right_child_index(current)
        left_exists = len(self._values) > left
        right_exists = len(self._values) > right

        while (
            (left_exists and self._values[left] < self._values[current]) or
            (right_exists and self._values[right] < self._values[current])
        ):
            only_left_exists = left_exists and not right_exists
            left_is_less_than_right = (
                left_exists and
                right_exists and
                self._values[left] < self._values[right])
            swap_with_left = only_left_exists or left_is_less_than_right

            if swap_with_left:
                self._swap_indices(current, left)
                current = left
            else:
                self._swap_indices(current, right)
                current = right

            left = _get_left_child_index(current)
            right = _get_right_child_index(current)
            left_exists = len(self._values) > left
            right_exists = len(self._values) > right

    def _sort_bottom_to_top(self):
        current = len(self._values) - 1
        parent = _get_parent_index(current)

        while current > 0 and self._values[current] < self._values[parent]:
            self._swap_indices(current, parent)
            current = parent
            parent = _get_parent_index(current)


def _get_left_child_index(i):
    return (i + 1) * 2 - 1


def _get_right_child_index(i):
    return (i + 1) * 2


def _get_parent_index(i):
    if i % 2 is 0:
        return int((i / 2) - 1)

    return int((i + 1) / 2) - 1
