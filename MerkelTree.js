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

  getproof(index) {
    let proof = [];
    this.buildProof(index, proof, this.leaves);
    return proof;
  }

  buildProof(index, proof, currentLayer) {
    if (currentLayer.length === 1) {
      return;
    }

    let nextLayer = [];
    for (let i = 0; i < currentLayer.length; i += 2) {
      if (i + 1 < currentLayer.length) {
        let leftNode = currentLayer[i];
        let rightNode = currentLayer[i + 1];
        let isPresent = index >= i && index <= i + 1;

        if (isPresent) {
          if (index == i) {
            proof.push({ data: rightNode, left: false });
          } else {
            proof.push({ data: leftNode, left: true });
          }
          nextLayer.push(this.concat(leftNode, rightNode));
        } else {
          nextLayer.push(this.concat(leftNode, rightNode));
        }
      } else {
        nextLayer.push(currentLayer[i]);
      }
    }

    return this.buildProof(Math.floor(index / 2), proof, nextLayer);
  }
}

module.exports = MerkleTree;
