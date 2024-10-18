import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WordleV2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const wordleV2Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_authorityAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_ATTEMPTS',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WORD_LENGTH',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'authorityAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'games',
    outputs: [
      { name: 'wordHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'attemptsLeft', internalType: 'uint8', type: 'uint8' },
      { name: 'completed', internalType: 'bool', type: 'bool' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'player', internalType: 'address', type: 'address' }],
    name: 'getGame',
    outputs: [
      {
        name: '',
        internalType: 'struct OnChainWordle.Game',
        type: 'tuple',
        components: [
          { name: 'wordHash', internalType: 'bytes32', type: 'bytes32' },
          { name: 'attemptsLeft', internalType: 'uint8', type: 'uint8' },
          { name: 'completed', internalType: 'bool', type: 'bool' },
          {
            name: 'letterCodes',
            internalType: 'bytes32[5]',
            type: 'bytes32[5]',
          },
          { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_guess', internalType: 'string', type: 'string' }],
    name: 'makeGuess',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_wordHash', internalType: 'bytes32', type: 'bytes32' },
      { name: '_letterCodes', internalType: 'bytes32[5]', type: 'bytes32[5]' },
      { name: '_salt', internalType: 'bytes32', type: 'bytes32' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'startNewGame',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_word', internalType: 'string', type: 'string' },
      { name: '_hash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'verifyWord',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameLost',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GameWon',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'player',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'guess', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'result',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'GuessResult',
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
] as const

export const wordleV2Address =
  '0x1050Ceaa756863fA53a84f4c47feA3AC9f3f7761' as const

export const wordleV2Config = {
  address: wordleV2Address,
  abi: wordleV2Abi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const readWordleV2 = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"MAX_ATTEMPTS"`
 */
export const readWordleV2MaxAttempts = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'MAX_ATTEMPTS',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"WORD_LENGTH"`
 */
export const readWordleV2WordLength = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'WORD_LENGTH',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"authorityAddress"`
 */
export const readWordleV2AuthorityAddress = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'authorityAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"games"`
 */
export const readWordleV2Games = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'games',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"getGame"`
 */
export const readWordleV2GetGame = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'getGame',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"verifyWord"`
 */
export const readWordleV2VerifyWord = /*#__PURE__*/ createReadContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'verifyWord',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const writeWordleV2 = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"makeGuess"`
 */
export const writeWordleV2MakeGuess = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'makeGuess',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"startNewGame"`
 */
export const writeWordleV2StartNewGame = /*#__PURE__*/ createWriteContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'startNewGame',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const simulateWordleV2 = /*#__PURE__*/ createSimulateContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"makeGuess"`
 */
export const simulateWordleV2MakeGuess = /*#__PURE__*/ createSimulateContract({
  abi: wordleV2Abi,
  address: wordleV2Address,
  functionName: 'makeGuess',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link wordleV2Abi}__ and `functionName` set to `"startNewGame"`
 */
export const simulateWordleV2StartNewGame =
  /*#__PURE__*/ createSimulateContract({
    abi: wordleV2Abi,
    address: wordleV2Address,
    functionName: 'startNewGame',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__
 */
export const watchWordleV2Event = /*#__PURE__*/ createWatchContractEvent({
  abi: wordleV2Abi,
  address: wordleV2Address,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameLost"`
 */
export const watchWordleV2GameLostEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: 'GameLost',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameStarted"`
 */
export const watchWordleV2GameStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: 'GameStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GameWon"`
 */
export const watchWordleV2GameWonEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: wordleV2Abi, address: wordleV2Address, eventName: 'GameWon' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link wordleV2Abi}__ and `eventName` set to `"GuessResult"`
 */
export const watchWordleV2GuessResultEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: wordleV2Abi,
    address: wordleV2Address,
    eventName: 'GuessResult',
  })
