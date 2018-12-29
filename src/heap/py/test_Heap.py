from heap import Heap

import unittest


class TestHeap(unittest.TestCase):
    def test_adds_elements_to_heap(self):
        heap = Heap()
        self.assertIs(len(heap), 0)

        heap.insert(1)
        self.assertIs(len(heap), 1)

    def test_removes_elements_from_heap(self):
        heap = Heap()

        heap.insert(1)
        self.assertIs(len(heap), 1)

        heap.remove()
        self.assertIs(len(heap), 0)

    def test_throws_when_removing_from_empty_heap(self):
        heap = Heap()
        with self.assertRaises(IndexError):
            heap.remove()

    def test_gets_top_element_from_the_heap(self):
        heap = Heap()
        heap.insert(2)
        heap.insert(1)
        heap.insert(3)
        self.assertIs(heap.top(), 1)

    def test_sorts_elements_in_ascending_order(self):
        heap = Heap()

        heap.insert(2)
        heap.insert(1)
        heap.insert(3)
        heap.insert(-1)
        heap.insert(7)
        heap.insert(4)
        heap.insert(8)

        self.assertIs(heap.top(), -1)
        heap.remove()

        self.assertIs(heap.top(), 1)
        heap.remove()

        self.assertIs(heap.top(), 2)
        heap.remove()

        self.assertIs(heap.top(), 3)
        heap.remove()

        self.assertIs(heap.top(), 4)
        heap.remove()

        self.assertIs(heap.top(), 7)
        heap.remove()

        self.assertIs(heap.top(), 8)


if __name__ == '__main__':
    unittest.main()
