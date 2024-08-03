const MerkleTree = require("./MerkelTree");
const verifyProof = require("./verify");

function simpleConcat(left, right) {
  return left + right;
}

const leaves = ["A", "B", "C", "D"];
const tree = new MerkleTree(leaves, simpleConcat);

const root = tree.getRoot();
console.log(root);

const index = 3;
const proof = tree.getproof(index);
console.log("Proof for leaf at index", index, ":", proof);

const leafHash = "C";
const isValid = verifyProof(proof, leafHash, root, simpleConcat);

console.log("Is proof valid?", isValid);
