import { keccak256, toBytes, concat, encodePacked, Hex, toHex, recoverMessageAddress, hashMessage } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { randomBytes } from 'crypto'


// Replace with your actual private key
const PRIVATE_KEY: Hex = '0xb91ceb667efc4610874220a9aee36bf5375d688ea68b2ad7e4e14f3b4c86a5d3'
const account = privateKeyToAccount(PRIVATE_KEY)

interface WordleGameData {
    wordHash: Hex
    letterCodes: readonly [Hex, Hex, Hex, Hex, Hex]
    salt: Hex
    signature: Hex
}

export async function generateWordleGameData(word: string): Promise<WordleGameData> {
    if (word.length !== 5) {
        throw new Error('Word must be exactly 5 letters long')
    }

    // Generate salt
    const salt = `0x${randomBytes(32).toString('hex')}` as Hex

    // Generate wordHash
    const wordHash = keccak256(toBytes(word))

    // Generate letterCodes
    const letterCodes = word.split('').map((letter, index) =>
        keccak256(encodePacked(
            ['bytes1', 'uint256', 'bytes32'],
            [`0x${letter.charCodeAt(0).toString(16).padStart(2, '0')}`, BigInt(index), salt]
        ))
    ) as [Hex, Hex, Hex, Hex, Hex] // Assert that we have exactly 5 elements

    // Prepare the message to be signed
    const messageHash = keccak256(
        encodePacked(
            ['bytes32', 'bytes32[5]', 'bytes32'],
            [wordHash, letterCodes, salt]
        )
    )



    // Sign the message
    const signature = await account.signMessage({
        message: { raw: messageHash },
    })

    return {
        wordHash,
        letterCodes,
        salt,
        signature
    }
}


export async function verifySignature(
    messageHash: Hex,
    signature: Hex,
    expectedAddress: Hex
): Promise<boolean> {
    try {
        const recoveredAddress = await recoverMessageAddress({
            message: { raw: messageHash },
            signature,
        })
        return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase()
    } catch (error) {
        console.error('Error verifying signature:', error)
        return false
    }
}


// Example usage
async function main() {
    try {
        const gameData = await generateWordleGameData('hello')
        console.log('Game Data:', gameData)


        // Prepare the message to be signed
        const messageHash = keccak256(
            encodePacked(
                ['bytes32', 'bytes32[5]', 'bytes32'],
                [gameData.wordHash, gameData.letterCodes, gameData.salt]
            )
        )



        const isValid = await verifySignature(
            messageHash,
            gameData.signature,
            account.address // Use the address derived from the private key
        )
        console.log('Signature is valid:', isValid)
    } catch (error) {
        console.error('Error:', error)
    }
}

main().then(() => {
    console.log('Game data generated successfully')
}).catch((error) => {
    console.error('Error generating game data:', error)
})
