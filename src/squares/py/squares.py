
def squares(board):
    size, h_matrix, v_matrix = board

    count_dict = {}

    # We want to enumerate all possible sizes that a square can be within
    # a dot matrix of (size)-by-(size) dimensions. i represents the size of the
    # squares we are currently checking.
    for i in range(1, size):
        count = 0
        # For each size i, we need to test all possible locations of a square.
        # j represents the row of a square we are checking.
        for j in range(size - i):
            # For each size i, we need to test all possible locations of a
            # square. k represents the column of a square we are checking.
            for k in range(size - i):
                if does_square_exist(board, square_size=i, row=j, col=k):
                    count += 1

        count_dict[i] = count

    return count_dict


def does_square_exist(board, square_size, row, col):
    _, h_matrix, v_matrix = board

    # Check if the vertical edges of the square exist.
    for i in range(row, row + square_size):
        if not v_matrix[i][col] or not v_matrix[i][col + square_size]:
            return False

    # Check if the horizontal edges of the square exist.
    for i in range(col, col + square_size):
        if not h_matrix[row][i] or not h_matrix[row + square_size][i]:
            return False

    return True
