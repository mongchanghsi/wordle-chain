import { defineConfig } from "@wagmi/cli";
import { actions } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "WordleV2",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_authorityAddress",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
        {
          inputs: [
            { internalType: "uint256", name: "length", type: "uint256" },
          ],
          name: "ECDSAInvalidSignatureLength",
          type: "error",
        },
        {
          inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
          name: "ECDSAInvalidSignatureS",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "GameLost",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "GameStarted",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
          ],
          name: "GameWon",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "player",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "guess",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "result",
              type: "string",
            },
          ],
          name: "GuessResult",
          type: "event",
        },
        {
          inputs: [],
          name: "MAX_ATTEMPTS",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "WORD_LENGTH",
          outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "authorityAddress",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "games",
          outputs: [
            { internalType: "bytes32", name: "wordHash", type: "bytes32" },
            { internalType: "uint8", name: "attemptsLeft", type: "uint8" },
            { internalType: "bool", name: "completed", type: "bool" },
            { internalType: "bytes32", name: "salt", type: "bytes32" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "player", type: "address" },
          ],
          name: "getGame",
          outputs: [
            {
              components: [
                { internalType: "bytes32", name: "wordHash", type: "bytes32" },
                { internalType: "uint8", name: "attemptsLeft", type: "uint8" },
                { internalType: "bool", name: "completed", type: "bool" },
                {
                  internalType: "bytes32[5]",
                  name: "letterCodes",
                  type: "bytes32[5]",
                },
                { internalType: "bytes32", name: "salt", type: "bytes32" },
              ],
              internalType: "struct WordleV2.Game",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
          name: "getLeaderboardEntry",
          outputs: [
            { internalType: "address", name: "player", type: "address" },
            { internalType: "uint256", name: "score", type: "uint256" },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getLeaderboardSize",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "string", name: "_guess", type: "string" }],
          name: "makeGuess",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "", type: "address" }],
          name: "scores",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes32", name: "_wordHash", type: "bytes32" },
            {
              internalType: "bytes32[5]",
              name: "_letterCodes",
              type: "bytes32[5]",
            },
            { internalType: "bytes32", name: "_salt", type: "bytes32" },
            { internalType: "bytes", name: "_signature", type: "bytes" },
          ],
          name: "startNewGame",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          name: "topFive",
          outputs: [
            { internalType: "address", name: "player", type: "address" },
            {
              internalType: "uint256",
              name: "correctGuesses",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "_word", type: "string" },
            { internalType: "bytes32", name: "_hash", type: "bytes32" },
          ],
          name: "verifyWord",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "pure",
          type: "function",
        },
      ],
      address: "0x4D3dF191FC0C0416A0FCFB47Def5faf45479cd95",
    },
  ],
  plugins: [actions()],
});
