class DisjointSet<V> {
  private parent: Map<V, V>;
  private rank: Map<V, number>;

  constructor(values: V[]) {
    this.parent = new Map<V, V>();
    this.rank = new Map<V, number>();
    for (const value of values) {
      this.parent.set(value, value);
      this.rank.set(value, 0);
    }
  }

  find(v: V): V {
    if (this.parent.get(v) !== v) {
      this.parent.set(v, this.find(this.parent.get(v))); // Path compression
    }
    return this.parent.get(v);
  }

  union(value1: V, value2: V): void {
    const rootX = this.find(value1);
    const rootY = this.find(value2);

    if (rootX === rootY) {
      return; // Already in the same set
    }

    // Union by rank
    if (this.rank.get(rootX) < this.rank.get(rootY)) {
      this.parent.set(rootX, rootY);
    } else if (this.rank.get(rootX) > this.rank.get(rootY)) {
      this.parent.set(rootY, rootX);
    } else {
      this.parent.set(rootY, rootX);
      this.rank.set(rootX, this.rank.get(rootX) + 1);
    }
  }
}
