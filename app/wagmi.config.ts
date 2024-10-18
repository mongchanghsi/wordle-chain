import { defineConfig } from '@wagmi/cli'
import { actions } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'WordleV2',
      abi: [
        {
          "type": "constructor",
          "inputs": [
            {
              "name": "_authorityAddress",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "MAX_ATTEMPTS",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "WORD_LENGTH",
          "inputs": [],
          "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "authorityAddress",
          "inputs": [],
          "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "games",
          "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
          "outputs": [
            { "name": "wordHash", "type": "bytes32", "internalType": "bytes32" },
            { "name": "attemptsLeft", "type": "uint8", "internalType": "uint8" },
            { "name": "completed", "type": "bool", "internalType": "bool" },
            { "name": "salt", "type": "bytes32", "internalType": "bytes32" }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "getGame",
          "inputs": [
            { "name": "player", "type": "address", "internalType": "address" }
          ],
          "outputs": [
            {
              "name": "",
              "type": "tuple",
              "internalType": "struct OnChainWordle.Game",
              "components": [
                {
                  "name": "wordHash",
                  "type": "bytes32",
                  "internalType": "bytes32"
                },
                {
                  "name": "attemptsLeft",
                  "type": "uint8",
                  "internalType": "uint8"
                },
                { "name": "completed", "type": "bool", "internalType": "bool" },
                {
                  "name": "letterCodes",
                  "type": "bytes32[5]",
                  "internalType": "bytes32[5]"
                },
                { "name": "salt", "type": "bytes32", "internalType": "bytes32" }
              ]
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "makeGuess",
          "inputs": [
            { "name": "_guess", "type": "string", "internalType": "string" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "startNewGame",
          "inputs": [
            { "name": "_wordHash", "type": "bytes32", "internalType": "bytes32" },
            {
              "name": "_letterCodes",
              "type": "bytes32[5]",
              "internalType": "bytes32[5]"
            },
            { "name": "_salt", "type": "bytes32", "internalType": "bytes32" },
            { "name": "_signature", "type": "bytes", "internalType": "bytes" }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "verifyWord",
          "inputs": [
            { "name": "_word", "type": "string", "internalType": "string" },
            { "name": "_hash", "type": "bytes32", "internalType": "bytes32" }
          ],
          "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
          "stateMutability": "pure"
        },
        {
          "type": "event",
          "name": "GameLost",
          "inputs": [
            {
              "name": "player",
              "type": "address",
              "indexed": false,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "GameStarted",
          "inputs": [
            {
              "name": "player",
              "type": "address",
              "indexed": false,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "GameWon",
          "inputs": [
            {
              "name": "player",
              "type": "address",
              "indexed": false,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "GuessResult",
          "inputs": [
            {
              "name": "player",
              "type": "address",
              "indexed": false,
              "internalType": "address"
            },
            {
              "name": "guess",
              "type": "string",
              "indexed": false,
              "internalType": "string"
            },
            {
              "name": "result",
              "type": "string",
              "indexed": false,
              "internalType": "string"
            }
          ],
          "anonymous": false
        },
        { "type": "error", "name": "ECDSAInvalidSignature", "inputs": [] },
        {
          "type": "error",
          "name": "ECDSAInvalidSignatureLength",
          "inputs": [
            { "name": "length", "type": "uint256", "internalType": "uint256" }
          ]
        },
        {
          "type": "error",
          "name": "ECDSAInvalidSignatureS",
          "inputs": [{ "name": "s", "type": "bytes32", "internalType": "bytes32" }]
        }
      ],
      address: '0x1050ceaa756863fa53a84f4c47fea3ac9f3f7761',
    },
  ],
  plugins: [actions()],
})
