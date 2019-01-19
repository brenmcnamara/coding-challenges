

# The goal of this function is to found the longest shared sub-sequence of two
# strings. The subsequence can have characters that are non-consecutive. Here
# are some examples of sub-strings:
#
# ("ABC", "A") => "A"
# ("ABC", "BCD") => "BC"
# ("AABBCCDD", "ABC") => "ABC"
# ("AABBCCDDEE", "ABACADAE") => "ABCDE"
#
# This implementation uses dynamic programming which is a technique of mixing
# recursion with shared memory, so that repeated recursive cases do not need
# to be recomputed
#
# The time complexity of this approach is about O(n^2) where n is the number of
# characters in the string. At each cartesian pair of characters, we check
# if the characters are equal, then perform a recursive search to build up
# the common sub-sequence between both strings. Because we store the results
# of each cartesian pair of characters, each pair needs to only be visited
# once.
def longest_subsequence(str1, str2):
    return _recurse(str1, str2, 0, 0, {})


def _recurse(str1, str2, ptr1, ptr2, memory):
    if ptr1 >= len(str1) or ptr2 >= len(str2):
        return ''

    if (ptr1, ptr2) in memory:
        return memory[(ptr1, ptr2)]

    # Perform greedy matching
    is_match = str1[ptr1] == str2[ptr2]
    if is_match:
        memory[(ptr1, ptr2)] = (
            str1[ptr1] + _recurse(str1, str2, ptr1 + 1, ptr2 + 1, memory))
        return memory[(ptr1, ptr2)]

    longest_sub = ''

    for i in range(ptr1 + 1, len(str1)):
        sub = _recurse(str1, str2, i, ptr2, memory)
        if len(sub) > len(longest_sub):
            longest_sub = sub

    for i in range(ptr2 + 1, len(str2)):
        sub = _recurse(str1, str2, ptr1, i, memory)
        if len(sub) > len(longest_sub):
            longest_sub = sub

    memory[(ptr1, ptr2)] = longest_sub
    return longest_sub
