import { test, describe, assert } from "vitest";
import { DisjointSet } from "../src/disjointSet";

describe("DisjointSet", () => {
  test("constructor()", () => {
    const vals = [1, 2, 3, 4, 5, 6];
    const set = new DisjointSet(vals);
    for (const val of vals) {
      assert(set.parent.get(val) === val);
      assert(set.rank.get(val) === 0);
    }
  });

  describe("find()", () => {
    test("returns correct parent after union", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      set.union(1, 2);
      set.union(2, 3);
      assert(set.find(3) === 1);
    });
    test("returns void if value not in set", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      assert.isUndefined(set.find(7));
    });
  });
  describe("union()", () => {
    test("do nothing if already in union", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      set.union(1, 2);
      set.union(2, 3);
      const rank1 = set.rank.get(1);
      const rank3 = set.rank.get(3);
      set.union(1, 3);
      assert.equal(set.rank.get(1), rank1);
      assert.equal(set.rank.get(3), rank3);
    });
    test("increments rank of first value if ranks are equal", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      set.union(1, 2);
      assert.equal(set.rank.get(1), 1);
      assert.equal(set.rank.get(2), 0);
    });
    test("sets first value parent to second value if second value rank is higher", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      set.union(1, 2);
      set.union(1, 3);
      assert.equal(set.parent.get(1), 1);
      assert.equal(set.parent.get(3), 1);
    });
    test("sets second value parent to first value if first value rank is higher", () => {
      const vals = [1, 2, 3, 4, 5, 6];
      const set = new DisjointSet(vals);
      set.union(1, 2);
      set.union(3, 1);
      assert.equal(set.parent.get(1), 1);
      assert.equal(set.parent.get(3), 1);
    });
  });
});
