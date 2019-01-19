from longest_subsequence import longest_subsequence

import unittest


class LongestSubsequenceTestCase(unittest.TestCase):
    def test_empty_string(self):
        self.assertEqual(longest_subsequence("", ""), "")
        self.assertEqual(longest_subsequence("", "abc"), "")
        self.assertEqual(longest_subsequence("abc", ""), "")

    def test_no_common_chars(self):
        self.assertEqual(longest_subsequence("abc", "def"), "")

    def test_strings_equal(self):
        self.assertEqual(longest_subsequence("abc", "abc"), "abc")

    def test_consecutive_match(self):
        self.assertEqual(longest_subsequence("abc", "bc"), "bc")
        self.assertEqual(longest_subsequence("bcdef", "defg"), "def")

    def test_non_consecutive_match(self):
        self.assertEqual(longest_subsequence("abcd", "acd"), "acd")
        self.assertEqual(longest_subsequence("aabbaaccaadd", "abdca"), "abca")


if __name__ == '__main__':
    unittest.main()
