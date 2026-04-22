import type { Iterator } from "./Iterator";
import type { SortedSet } from "./SortedSet";

/**
 * A sorted set with navigation methods returning closest matches for search targets.
 *
 * @template E element type
 */
export interface NavigableSet<E> extends SortedSet<E> {
  lower(element: E): E | undefined;
  floor(element: E): E | undefined;
  ceiling(element: E): E | undefined;
  higher(element: E): E | undefined;

  pollFirst(): E | undefined;
  pollLast(): E | undefined;

  descendingIterator(): Iterator<E>;
}
