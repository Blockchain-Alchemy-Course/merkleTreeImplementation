function verifyProof(proof, node, root, concat) {
  let currentHash = node;

  for (let i = 0; i < proof.length; i++) {
    let proofElement = proof[i];

    if (proofElement.left) {
      currentHash = concat(proofElement.data, currentHash);
    } else {
      currentHash = concat(currentHash, proofElement.data);
    }
  }
  return currentHash == root;
}

module.exports = verifyProof;
