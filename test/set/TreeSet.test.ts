import { beforeEach, describe, expect, it } from "vitest";
import { TreeSet } from "../../src/set/TreeSet";
import { describeSet } from "../interfaces/Set.test";

// Run shared Set interface tests
describeSet(() => new TreeSet<number>());

describe("TreeSet - Ordering and Comparator", () => {
  let set: TreeSet<number>;

  beforeEach(() => {
    set = new TreeSet<number>();
  });

  it("should keep values sorted in ascending order by default", () => {
    set.add(10);
    set.add(2);
    set.add(7);

    expect(set.toArray()).toEqual([2, 7, 10]);
  });

  it("should keep uniqueness by comparator equality", () => {
    const caseInsensitive = new TreeSet<string>({
      comparator: (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
    });

    expect(caseInsensitive.add("A")).toBe(true);
    expect(caseInsensitive.add("a")).toBe(false);
    expect(caseInsensitive.size()).toBe(1);
  });

  it("should support custom comparator", () => {
    const desc = new TreeSet<number>({ comparator: (a, b) => b - a });

    desc.add(1);
    desc.add(3);
    desc.add(2);

    expect(desc.toArray()).toEqual([3, 2, 1]);
  });

  it("should require comparator for object values", () => {
    const objectSet = new TreeSet<{ id: number }>();
    objectSet.add({ id: 1 });

    expect(() => objectSet.add({ id: 2 })).toThrow(
      "Comparator is required for non-primitive element types",
    );
  });

  it("should iterate in sorted order", () => {
    set.add(4);
    set.add(1);
    set.add(3);

    const values: number[] = [];
    const iterator = set.iterator();

    while (iterator.hasNext()) {
      values.push(iterator.next());
    }

    expect(values).toEqual([1, 3, 4]);
  });
});
