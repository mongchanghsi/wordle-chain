import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WordleV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const wordleV2Abi = [
  {
    inputs: [
      { internalType: "address", name: "_authorityAddress", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
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
      { indexed: false, internalType: "string", name: "guess", type: "string" },
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
    inputs: [{ internalType: "address", name: "player", type: "address" }],
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
      { internalType: "bytes32[5]", name: "_letterCodes", type: "bytes32[5]" },
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
      { internalType: "uint256", name: "correctGuesses", type: "uint256" },
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
] as const;

export const wordleV2Address =
  "0x4D3dF191FC0C0416A0FCFB47Def5faf45479cd95" as const;

export const wordleV2Config = {
  address: wordleV2Address,
  abi: wordleV2Abi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const readWordleV2 = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"MAX_ATTEMPTS"`
 */
export const readWordleV2MaxAttempts = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "MAX_ATTEMPTS",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"WORD_LENGTH"`
 */
export const readWordleV2WordLength = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "WORD_LENGTH",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"authorityAddress"`
 */
export const readWordleV2AuthorityAddress = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "authorityAddress",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"games"`
 */
export const readWordleV2Games = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "games",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"getGame"`
 */
export const readWordleV2GetGame = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "getGame",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"verifyWord"`
 */
export const readWordleV2VerifyWord = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "verifyWord",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const writeWordleV2 = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"makeGuess"`
 */
export const writeWordleV2MakeGuess = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "makeGuess",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"startNewGame"`
 */
export const writeWordleV2StartNewGame = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "startNewGame",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const simulateWordleV2 = /*#__PURE__*/ createSimulateContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"makeGuess"`
 */
export const simulateWordleV2MakeGuess = /*#__PURE__*/ createSimulateContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: "makeGuess",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"startNewGame"`
 */
export const simulateWordleV2StartNewGame =
  /*#__PURE__*/ createSimulateContract({
    abi: wordleV2Abi,
    address: wordleV2Address,
    functionName: "startNewGame",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const watchWordleV2Event = /*#__PURE__*/ createWatchContractEvent({
  abi: wordleV2Abi,
  address: wordleV2Address,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameLost"`
 */
export const watchWordleV2GameLostEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: "GameLost",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameStarted"`
 */
export const watchWordleV2GameStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: "GameStarted",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameWon"`
 */
export const watchWordleV2GameWonEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: wordleV2Abi, address: wordleV2Address, eventName: "GameWon" }
);

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GuessResult"`
 */
export const watchWordleV2GuessResultEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: "GuessResult",
  });
