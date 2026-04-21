import { beforeEach, describe, expect, it } from "vitest";
import { TreeMap } from "../../src/map/TreeMap";
import { describeMap } from "../interfaces/Map.test";

// Run shared Map interface tests
describeMap(() => new TreeMap<string, number>());

describe("TreeMap - Ordering and Comparator", () => {
  let map: TreeMap<number, string>;

  beforeEach(() => {
    map = new TreeMap<number, string>();
  });

  it("should keep keys sorted in ascending order by default", () => {
    map.put(10, "ten");
    map.put(2, "two");
    map.put(7, "seven");

    expect(map.keys()).toEqual([2, 7, 10]);
  });

  it("should keep entries sorted by key", () => {
    map.put(3, "three");
    map.put(1, "one");
    map.put(2, "two");

    expect(map.entries()).toEqual([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);
  });

  it("should support custom comparator", () => {
    const desc = new TreeMap<number, string>({ comparator: (a, b) => b - a });

    desc.put(1, "one");
    desc.put(3, "three");
    desc.put(2, "two");

    expect(desc.keys()).toEqual([3, 2, 1]);
  });

  it("should replace key considered equal by comparator", () => {
    const caseInsensitive = new TreeMap<string, number>({
      comparator: (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
    });

    caseInsensitive.put("A", 1);
    const previous = caseInsensitive.put("a", 2);

    expect(previous).toBe(1);
    expect(caseInsensitive.size()).toBe(1);
    expect(caseInsensitive.get("A")).toBe(2);
  });

  it("should require comparator for object keys", () => {
    const objectKeyMap = new TreeMap<{ id: number }, string>();
    objectKeyMap.put({ id: 1 }, "one");

    expect(() => objectKeyMap.put({ id: 2 }, "two")).toThrow(
      "Comparator is required for non-primitive key types",
    );
  });
});
