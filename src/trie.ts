export class TrieNode<V> {
  children: Map<V, TrieNode<V>>;
  terminal: boolean;

  constructor() {
    this.children = new Map();
    this.terminal = false;
  }
}

export class Trie<T extends ArrayLike<V>, V> {
  root: TrieNode<V>;

  constructor() {
    this.root = new TrieNode();
  }

  search(value: T): boolean {
    let currentNode = this.root;
    for (let index = 0; index < value.length; index++) {
      let char = value[index];
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
      } else {
        return false;
      }
    }

    return currentNode.terminal;
  }

  startsWith(prefix: T): boolean {
    let currentNode = this.root;
    for (let index = 0; index < prefix.length; index++) {
      let char = prefix[index];
      if (currentNode.children.has(char)) {
        currentNode = currentNode.children.get(char);
      } else {
        return false;
      }
    }

    return true;
  }

  insert(value: T) {
    let currentNode = this.root;
    for (let index = 0; index < value.length; index++) {
      let char = value[index];
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }

      currentNode = currentNode.children.get(char);
    }

    currentNode.terminal = true;
  }

  delete(value: T) {
    if (value.length === 0) return;

    // stack to keep track of nodes visited
    const traversedStack: TrieNode<V>[] = [];

    let currentNode = this.root;

    for (let index = 0; index < value.length; index++) {
      traversedStack.push(currentNode);
      let char = value[index];
      if (!currentNode.children.has(char)) {
        // value does not exist
        return;
      }
      currentNode = currentNode.children.get(char);
    }

    currentNode.terminal = false;
    // iteratively delete unneeded nodes using stack, stopping short of the root which is allowed to be empty
    while (currentNode.children.size === 0 && traversedStack.length >= 1) {
      // we no longer need this node for now, so delete it from parent's children Map
      const parent = traversedStack.pop();
      parent.children.delete(value[value.length - 1]);
      currentNode = parent;
    }
  }
}
