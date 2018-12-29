from rare_order import rare_order

import unittest


class TestRareOrder(unittest.TestCase):

    def test_passes_example_test(self):
        self.assertEquals(
            rare_order(['XWY', 'ZX', 'ZXY', 'ZXW', 'YWWX']), 'XZYW')

    def test_specifies_order_on_single_letter_words(self):
        self.assertEquals(rare_order(['A', 'C', 'B', 'D']), 'ACBD')

    def test_ordering_with_chars_that_do_not_show_at_start_of_word(self):
        self.assertEquals(
            rare_order(['AC', 'AB', 'AF', 'AE', 'C']), 'ACBFE')

    def test_raises_error_when_multiple_valid_orderings(self):
        with self.assertRaises(ValueError):
            rare_order(['AB', 'AC'])

    def test_edge_case(self):
        self.assertEquals(
            rare_order(['A', 'C', 'CB', 'CC', 'CCA', 'CCB']), 'ABC')

    def test_raises_error_if_invalid_ordering(self):
        with self.assertRaises(ValueError):
            rare_order(['A', 'B', 'AA'])
        with self.assertRaises(ValueError):
            rare_order(['A', 'B', 'BB', 'BC', 'BCC', 'BCA'])

    def test_raises_error_if_empty_list(self):
        with self.assertRaises(ValueError):
            rare_order([])

    def test_raises_error_if_given_empty_word(self):
        with self.assertRaises(ValueError):
            rare_order(['A', 'B', ''])


if __name__ == '__main__':
    unittest.main()
