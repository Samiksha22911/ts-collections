import type { Map as MapInterface } from "./Map";

/**
 * A map that further provides a total ordering on its keys.
 *
 * @template K key type
 * @template V value type
 */
export interface SortedMap<K, V> extends MapInterface<K, V> {
  /**
   * Returns the first (lowest) key currently in this map.
   */
  firstKey(): K;

  /**
   * Returns the last (highest) key currently in this map.
   */
  lastKey(): K;

  /**
   * Returns a view containing keys strictly less than (or equal if inclusive) toKey.
   */
  headMap(toKey: K, inclusive?: boolean): SortedMap<K, V>;

  /**
   * Returns a view containing keys greater than (or equal if inclusive) fromKey.
   */
  tailMap(fromKey: K, inclusive?: boolean): SortedMap<K, V>;

  /**
   * Returns a view containing keys in the given range.
   */
  subMap(
    fromKey: K,
    toKey: K,
    fromInclusive?: boolean,
    toInclusive?: boolean,
  ): SortedMap<K, V>;
}
