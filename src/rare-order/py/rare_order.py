
def rare_order(words):
    order_map = _create_order_map(words)

    ordering = ''

    while order_map:
        did_find_empty_set = False
        for char, set in order_map.items():

            if not set:
                did_find_empty_set = True
                ordering = char + ordering
                del order_map[char]

                for other_set in order_map.values():
                    if not other_set:
                        raise ValueError('Multiple possible orderings')
                    if char in other_set:
                        other_set.remove(char)
                break

        if not did_find_empty_set:
            raise ValueError('Bad ordering')

    return ordering


def _create_order_map(words):
    order_map = dict()

    try:
        _register_word(order_map, words[0])
    except IndexError:
        raise ValueError('Expecting words to have at least 1 word')

    for i, word1 in enumerate(words[:-1]):
        word2 = words[i + 1]
        _register_word(order_map, word2)

        for char1, char2 in zip(word1, word2):
            if char1 is not char2:
                order_map[char1].add(char2)
                break

    return order_map


def _register_word(order_map, word):
    if not word:
        raise ValueError('Cannot define ordering with empty words')

    for char in word:
        if char not in order_map:
            order_map[char] = set()
