/* @flow */

export default class Heap {
  /**
   * This is an array that represents all the elements of the heap. This array
   * represents a binary tree, where the left child of the ith element is at
   * the (2 * i)th index and the right child is at the (2 * i + 1)th index.
   */
  _values: Array<number> = [];

  /**
   * The number of elements in the heap.
   */
  get size(): number {
    return this._values.length;
  }

  /**
   * Insert an element into the heap.
   */
  insert(num: number): void {
    this._values.push(num);
    this._sortBottomUp();
  }

  top(): number {
    if (this.size === 0) {
      throw Error('Cannot call top() on empty heap');
    }
    return this._values[0];
  }

  remove(): void {
    if (this.size === 0) {
      throw Error('Cannot call remove() on empty heap');
    } else if (this.size === 1) {
      this._values = [];
    }

    this._swapIndices(0, this.size - 1);
    this._values.pop();
    this._sortTopDown();
  }

  /**
   * Swaps the specified indices in the _values array. Undefined behavior if
   * trying to sort indices that do not exist.
   */
  _swapIndices(i1: number, i2: number): void {
    const temp = this._values[i1];
    this._values[i1] = this._values[i2];
    this._values[i2] = temp;
  }

  /**
   * This method assumes that the _values array does not satisfy the heap
   * property only becuase the last element of the heap is out of order. This
   * will swap the elements in the heap until the heap property is satisfied.
   */
  _sortBottomUp(): void {
    let current = this.size - 1;
    let parent = current % 2 === 0 ? current / 2 - 1 : (current + 1) / 2 - 1;

    while (current > 0 && this._values[current] < this._values[parent]) {
      this._swapIndices(current, parent);

      current = parent;
      parent = current % 2 === 0 ? current / 2 - 1 : (current + 1) / 2 - 1;
    }
  }

  /**
   * This method assumes that the _values array does not satisfy the heap
   * property only because the top element of the heap is out of order. This
   * will swap the elements in the heap until the heap property is satisfied.
   */
  _sortTopDown(): void {
    let current = 0;
    let left = (current + 1) * 2 - 1;
    let right = (current + 1) * 2;
    let leftExists = this.size > left;
    let rightExists = this.size > right;

    // Check if the heap property is satisfied for the current index.
    while (
      (leftExists && this._values[left] < this._values[current]) ||
      (rightExists && this._values[right] < this._values[current])
    ) {
      // Swap with the smallest child.
      if (
        (leftExists && !rightExists) ||
        (leftExists && rightExists && this._values[left] < this._values[right])
      ) {
        this._swapIndices(current, left);
        current = left;
      } else {
        this._swapIndices(current, right);
        current = right;
      }

      left = (current + 1) * 2 - 1;
      right = (current + 1) * 2;
      leftExists = this.size > left;
      rightExists = this.size > right;
    }
  }
}
