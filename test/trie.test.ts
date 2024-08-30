import { test, describe, assert } from "vitest";
import { Trie } from "./../src/trie";

function split(s: string) {
  return s.split("");
}

describe("Trie", () => {
  test("constructs empty root on initialization", () => {
    const trie = new Trie();
    assert(trie.root.children.size === 0);
    assert.isFalse(trie.root.terminal);
  });

  describe("search()", () => {
    test("returns false it value does not exist", () => {
      const trie = new Trie<string[], string>();

      assert.isFalse(trie.search("hello".split("")));
    });
    test("returns false if terminal is false", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert.isFalse(trie.search(split("hel")));
    });
    test("returns true if value exists", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert(trie.search(split("hello")));
    });
  });

  describe("startWith()", () => {
    test("returns true if prefix exists and not terminal", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert(trie.startsWith(split("hel")));
    });
    test("returns true if prefix exists and terminal", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert(trie.search(split("hello")));
    });
    test("returns false if prefix does not exist", () => {
      const trie = new Trie<string[], string>();
      assert.isFalse(trie.search(split("hel")));
    });
  });

  describe("insert()", () => {
    test("inserted value is able to be searched", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert(trie.search(split("hello")));
    });
    test("able to insert value twice with no side effects", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      trie.insert(split("hello"));
      assert(trie.search(split("hello")));
    });
  });

  describe("delete()", () => {
    test("if value does not exist, no effect", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("hello"));
      assert.doesNotThrow(() => trie.delete(split("hel")));
      assert(trie.search(split("hello")));
    });
    test("if last node has no children, deletes node", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("h"));
      trie.delete(split("h"));
      assert.isFalse(trie.search(split("h")));
      assert.isFalse(trie.root.children.has("h"));
      // ensure root is not deleted
      assert(trie.root);
    });
    test("if last node has children, terminal set to false only", () => {
      const trie = new Trie<string[], string>();
      trie.insert(split("he"));
      trie.insert(split("hello"));
      trie.delete(split("he"));
      assert.isFalse(trie.search(split("he")));
      assert(trie.search(split("hello")));
    });
  });
});
