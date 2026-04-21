import {
  AbstractSet,
  type TypeValidationOptions,
} from "../abstracts/AbstractSet";
import type { Collection } from "../interfaces/Collection";
import type { Iterator } from "../interfaces/Iterator";
import type { Set as SetInterface } from "../interfaces/Set";

export interface TreeSetOptions<T> extends TypeValidationOptions<T> {
  comparator?: (a: T, b: T) => number;
}

/**
 * A sorted Set implementation backed by an ordered array.
 *
 * Ordering is defined by a custom comparator or by default primitive/date comparison.
 *
 * @template T The type of elements in this set
 */
export class TreeSet<T> extends AbstractSet<T> implements SetInterface<T> {
  private readonly comparator: (a: T, b: T) => number;
  private readonly orderedValues: T[] = [];

  constructor(options?: TreeSetOptions<T>) {
    super(options);
    this.comparator = options?.comparator ?? this.defaultComparator;
  }

  override add(element: T): boolean {
    this.validateElementType(element);

    const index = this.findIndex(element);
    if (index >= 0) {
      return false;
    }

    const insertionIndex = -index - 1;
    this.orderedValues.splice(insertionIndex, 0, element);
    return true;
  }

  override remove(element: T): boolean {
    const index = this.findIndex(element);
    if (index < 0) {
      return false;
    }

    this.orderedValues.splice(index, 1);

    if (this.orderedValues.length === 0) {
      this.resetTypeInference();
    }

    return true;
  }

  override contains(element: T): boolean {
    return this.findIndex(element) >= 0;
  }

  override size(): number {
    return this.orderedValues.length;
  }

  override clear(): void {
    this.orderedValues.length = 0;
    this.resetTypeInference();
  }

  override iterator(): Iterator<T> {
    const snapshot = this.toArray();
    let index = 0;

    return {
      hasNext: () => index < snapshot.length,
      next: () => {
        if (index >= snapshot.length) {
          throw new Error("No more elements");
        }
        const value = snapshot[index++];
        if (value === undefined) {
          throw new Error("No more elements");
        }
        return value;
      },
    };
  }

  override toArray(): T[] {
    return [...this.orderedValues];
  }

  override removeAll(elements: Collection<T>): boolean {
    let modified = false;
    for (const element of elements.toArray()) {
      if (this.remove(element)) {
        modified = true;
      }
    }
    return modified;
  }

  override retainAll(elements: Collection<T>): boolean {
    const keepValues = elements.toArray();
    const toRemove: T[] = [];

    for (const value of this.orderedValues) {
      if (
        !keepValues.some((candidate) => this.comparator(value, candidate) === 0)
      ) {
        toRemove.push(value);
      }
    }

    if (toRemove.length === 0) {
      return false;
    }

    for (const value of toRemove) {
      this.remove(value);
    }

    return true;
  }

  /**
   * Returns the found index, or insertion point encoded as `-(index + 1)`.
   */
  private findIndex(element: T): number {
    let low = 0;
    let high = this.orderedValues.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midValue = this.valueAt(mid);
      const cmp = this.comparator(element, midValue);

      if (cmp === 0) {
        return mid;
      }

      if (cmp < 0) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return -(low + 1);
  }

  private valueAt(index: number): T {
    const value = this.orderedValues[index];
    if (value === undefined) {
      throw new Error(`Invalid set index: ${index}`);
    }
    return value;
  }

  private readonly defaultComparator = (a: T, b: T): number => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    if (typeof a === "string" && typeof b === "string") {
      return a < b ? -1 : a > b ? 1 : 0;
    }

    if (typeof a === "bigint" && typeof b === "bigint") {
      return a < b ? -1 : a > b ? 1 : 0;
    }

    if (typeof a === "boolean" && typeof b === "boolean") {
      return Number(a) - Number(b);
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    throw new Error("Comparator is required for non-primitive element types");
  };
}
