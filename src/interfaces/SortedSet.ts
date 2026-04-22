import type { Set as SetInterface } from "./Set";

/**
 * A set that provides a total ordering on its elements.
 *
 * @template E element type
 */
export interface SortedSet<E> extends SetInterface<E> {
  /**
   * Returns the first (lowest) element currently in this set.
   */
  first(): E;

  /**
   * Returns the last (highest) element currently in this set.
   */
  last(): E;

  /**
   * Returns a view containing elements strictly less than (or equal if inclusive) toElement.
   */
  headSet(toElement: E, inclusive?: boolean): SortedSet<E>;

  /**
   * Returns a view containing elements greater than (or equal if inclusive) fromElement.
   */
  tailSet(fromElement: E, inclusive?: boolean): SortedSet<E>;

  /**
   * Returns a view containing elements in the given range.
   */
  subSet(
    fromElement: E,
    toElement: E,
    fromInclusive?: boolean,
    toInclusive?: boolean,
  ): SortedSet<E>;
}
