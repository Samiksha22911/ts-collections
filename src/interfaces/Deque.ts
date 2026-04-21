import type { Queue } from "./Queue";

/**
 * A linear collection that supports element insertion and removal at both ends.
 *
 * This interface mirrors Java's Deque semantics while remaining TypeScript-friendly.
 *
 * @template E The type of elements in this deque
 */
export interface Deque<E> extends Queue<E> {
  /**
   * Inserts the specified element at the front of this deque.
   *
   * @param element Element to add at the front
   */
  addFirst(element: E): void;

  /**
   * Inserts the specified element at the end of this deque.
   *
   * @param element Element to add at the end
   */
  addLast(element: E): void;

  /**
   * Inserts the specified element at the front of this deque.
   *
   * @param element Element to add at the front
   * @returns true if the element was added
   */
  offerFirst(element: E): boolean;

  /**
   * Inserts the specified element at the end of this deque.
   *
   * @param element Element to add at the end
   * @returns true if the element was added
   */
  offerLast(element: E): boolean;

  /**
   * Retrieves and removes the first element of this deque.
   *
   * @returns The first element
   * @throws Error if this deque is empty
   */
  removeFirst(): E;

  /**
   * Retrieves and removes the last element of this deque.
   *
   * @returns The last element
   * @throws Error if this deque is empty
   */
  removeLast(): E;

  /**
   * Retrieves and removes the first element of this deque,
   * or returns undefined if this deque is empty.
   */
  pollFirst(): E | undefined;

  /**
   * Retrieves and removes the last element of this deque,
   * or returns undefined if this deque is empty.
   */
  pollLast(): E | undefined;

  /**
   * Retrieves, but does not remove, the first element of this deque.
   *
   * @returns The first element
   * @throws Error if this deque is empty
   */
  getFirst(): E;

  /**
   * Retrieves, but does not remove, the last element of this deque.
   *
   * @returns The last element
   * @throws Error if this deque is empty
   */
  getLast(): E;

  /**
   * Retrieves, but does not remove, the first element of this deque,
   * or returns undefined if this deque is empty.
   */
  peekFirst(): E | undefined;

  /**
   * Retrieves, but does not remove, the last element of this deque,
   * or returns undefined if this deque is empty.
   */
  peekLast(): E | undefined;
}
