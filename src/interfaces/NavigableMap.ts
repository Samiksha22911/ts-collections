import type { SortedMap } from "./SortedMap";

/**
 * A sorted map with navigation methods returning closest matches for search targets.
 *
 * @template K key type
 * @template V value type
 */
export interface NavigableMap<K, V> extends SortedMap<K, V> {
  lowerKey(key: K): K | undefined;
  floorKey(key: K): K | undefined;
  ceilingKey(key: K): K | undefined;
  higherKey(key: K): K | undefined;

  firstEntry(): [K, V];
  lastEntry(): [K, V];
  pollFirstEntry(): [K, V] | undefined;
  pollLastEntry(): [K, V] | undefined;
}
