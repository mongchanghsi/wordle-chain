import { keccak256, toBytes, encodePacked, Hex } from "viem";
import { randomBytes } from "crypto";

export const getWord = () => {
  const words = ["react", "state", "props", "hooks", "redux"];
  return words[Math.floor(Math.random() * words.length)];
};

export const generateWordHash = (word: string) => {
  if (word.length !== 5) throw new Error("Word must be exactly 5 letters long");
  const salt = `0x${randomBytes(32).toString("hex")}` as Hex;
  const wordHash = keccak256(toBytes(word));
  const letterCodes = word
    .split("")
    .map((letter, index) =>
      keccak256(
        encodePacked(
          ["bytes1", "uint256", "bytes32"],
          [
            `0x${letter.charCodeAt(0).toString(16).padStart(2, "0")}`,
            BigInt(index),
            salt,
          ]
        )
      )
    ) as [Hex, Hex, Hex, Hex, Hex]; // Assert that we have exactly 5 elements

  const messageHash = keccak256(
    encodePacked(
      ["bytes32", "bytes32[5]", "bytes32"],
      [wordHash, letterCodes, salt]
    )
  );

  return {
    messageHash,
    wordHash,
    letterCodes,
    salt,
  };
};
