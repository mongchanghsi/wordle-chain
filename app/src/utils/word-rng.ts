import { keccak256, toBytes, encodePacked, Hex } from "viem";
import { randomBytes } from "crypto";
import { privateKeyToAccount } from "viem/accounts";
import ENVIRONMENT from "@/configuration/environment";

export const getWord = () => {
  const words = ["react", "state", "props", "hooks", "redux"];
  return words[Math.floor(Math.random() * words.length)];
};

export const generateWordHash = async (
  word: string
): Promise<{
  wordHash: `0x${string}`;
  letterCodes: [
    `0x${string}`,
    `0x${string}`,
    `0x${string}`,
    `0x${string}`,
    `0x${string}`,
  ];
  salt: `0x${string}`;
  signature: `0x${string}`;
}> => {
  if (!ENVIRONMENT.HASH_PRIVATE_KEY) {
    return {
      wordHash: "0x",
      letterCodes: [`0x`, `0x`, `0x`, `0x`, `0x`],
      salt: "0x",
      signature: "0x",
    };
  }

  // Replace with your actual private key
  const PRIVATE_KEY: Hex = `0x${ENVIRONMENT.HASH_PRIVATE_KEY}`;
  const account = privateKeyToAccount(PRIVATE_KEY);

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

  // Sign the message
  const signature = await account.signMessage({
    message: { raw: messageHash },
  });

  return {
    wordHash,
    letterCodes,
    salt,
    signature,
  };
};
