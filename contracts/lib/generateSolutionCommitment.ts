import ethers from "ethers";

// Function to generate the solution commitment
export const generateSolutionCommitment = (solution: string, salt: string) => {
  const abiCoder = new ethers.AbiCoder();
  const encodedData = abiCoder.encode(["string", "string"], [solution, salt]);
  const solutionCommitment = ethers.keccak256(encodedData);
  return solutionCommitment;
};

// Example usage
// const solution = "apple"; // The actual solution
// const salt = "randomSalt"; // A random salt

// const commitment = generateSolutionCommitment(solution, salt);
// console.log("Solution Commitment:", commitment);
