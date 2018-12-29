import Heap from '../heap';

test('Adds elements to the heap', () => {
  const heap = new Heap();
  expect(heap.size).toBe(0);
  heap.insert(1);
  expect(heap.size).toBe(1);
});

test('Removes elements from the heap', () => {
  const heap = new Heap();

  heap.insert(1);
  expect(heap.size).toBe(1);

  heap.remove();
  expect(heap.size).toBe(0);
});

test('Throws when removing an empty heap', () => {
  const heap = new Heap();

  expect(() => heap.remove()).toThrow();
});

test('Sorts elements in ascending order', () => {
  const heap = new Heap();

  heap.insert(2);
  heap.insert(1);
  heap.insert(3);
  heap.insert(-1);
  heap.insert(7);
  heap.insert(4);
  heap.insert(8);

  expect(heap.top()).toBe(-1);
  heap.remove();

  expect(heap.top()).toBe(1);
  heap.remove();

  expect(heap.top()).toBe(2);
  heap.remove();

  expect(heap.top()).toBe(3);
  heap.remove();

  expect(heap.top()).toBe(4);
  heap.remove();

  expect(heap.top()).toBe(7);
  heap.remove();

  expect(heap.top()).toBe(8);
});

test('Gets the top element of the heap', () => {
  const heap = new Heap();

  heap.insert(1);
  heap.insert(2);

  expect(heap.top()).toBe(1);
});
