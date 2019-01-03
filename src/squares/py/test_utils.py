
def visual_to_board(visual):
    rows = visual.split('\n')[1: -1]
    horizontals = [row for index, row in enumerate(rows) if index % 2 == 0]
    verticals = [row for index, row in enumerate(rows) if index % 2 == 1]

    size = len(horizontals)

    assert size > 0
    assert len(horizontals) - 1 == len(verticals)

    leading_spaces = len(horizontals[0]) - len(horizontals[0].lstrip())

    h_matrix = [[s == '-' for s in r.split('*')[1:-1]] for r in horizontals]

    v_matrix = []
    for row in verticals:
        # Need to adjust the leading and trailing whitespace correctly.
        normalized_row = row.rstrip()[leading_spaces:]
        normalized_row = normalized_row + (
            ' ' * (2 * size - 1 - len(normalized_row)))

        symbols = [
            sym == '|' for i, sym in enumerate(normalized_row) if i % 2 == 0]
        v_matrix.append(symbols)

    return (size, h_matrix, v_matrix)
