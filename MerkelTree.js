class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  getRoot() {
    return this.computeRoot(this.leaves);
  }

  computeRoot(leaves) {
    if (leaves.length == 1) {
      return leaves[0];
    }

    let nextLayer = [];

    for (let i = 0; i < leaves.length; i += 2) {
      if (i + 1 < leaves.length) {
        nextLayer.push(this.concat(leaves[i], leaves[i + 1]));
      } else {
        nextLayer.push(leaves[i]);
      }
    }

    return this.computeRoot(nextLayer);
  }
}
