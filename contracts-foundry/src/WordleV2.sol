// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract OnChainWordle {
    using ECDSA for bytes32;

    struct Game {
        bytes32 wordHash;
        uint8 attemptsLeft;
        bool completed;
        bytes32[5] letterCodes;
        bytes32 salt;
    }

    mapping(address => Game) public games;
    uint8 public constant MAX_ATTEMPTS = 5;
    uint8 public constant WORD_LENGTH = 5;

    address public authorityAddress;

    event GameStarted(address player);
    event GuessResult(address player, string guess, string result);
    event GameWon(address player);
    event GameLost(address player);

    constructor(address _authorityAddress) {
        authorityAddress = _authorityAddress;
    }

    function startNewGame(
        bytes32 _wordHash,
        bytes32[5] memory _letterCodes,
        bytes32 _salt,
        bytes memory _signature
    ) public {
        require(
            games[msg.sender].attemptsLeft == 0 || games[msg.sender].completed,
            "Finish your current game first"
        );

        // Verify the signature
        bytes32 messageHash = keccak256(
            abi.encodePacked(_wordHash, _letterCodes, _salt)
        );
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);
        require(signer == authorityAddress, "Invalid signature");

        games[msg.sender] = Game(
            _wordHash,
            MAX_ATTEMPTS,
            false,
            _letterCodes,
            _salt
        );
        emit GameStarted(msg.sender);
    }

    function makeGuess(string memory _guess) public {
        Game storage game = games[msg.sender];
        require(game.attemptsLeft > 0, "No more attempts left");
        require(!game.completed, "Game is already completed");
        require(
            bytes(_guess).length == WORD_LENGTH,
            "Guess must be 5 letters long"
        );

        game.attemptsLeft--;

        bytes32 guessHash = keccak256(abi.encodePacked(_guess));
        string memory result = checkGuess(_guess, game.letterCodes, game.salt);
        emit GuessResult(msg.sender, _guess, result);

        if (guessHash == game.wordHash) {
            game.completed = true;
            emit GameWon(msg.sender);
        } else if (game.attemptsLeft == 0) {
            game.completed = true;
            emit GameLost(msg.sender);
        }
    }

    function checkGuess(
        string memory _guess,
        bytes32[5] memory _letterCodes,
        bytes32 _salt
    ) internal pure returns (string memory) {
        bytes memory guessBytes = bytes(_guess);
        bytes memory result = new bytes(5);

        for (uint i = 0; i < 5; i++) {
            bytes32 guessCode = encodeLetterPosition(guessBytes[i], i, _salt);

            if (guessCode == _letterCodes[i]) {
                result[i] = 0x32; // ASCII for '2' - correct letter and position
            } else {
                bool found = false;
                for (uint j = 0; j < 5; j++) {
                    if (
                        encodeLetterPosition(guessBytes[i], j, _salt) ==
                        _letterCodes[j]
                    ) {
                        result[i] = 0x31; // ASCII for '1' - correct letter, wrong position
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result[i] = 0x30; // ASCII for '0' - letter not in word
                }
            }
        }

        return string(result);
    }

    function encodeLetterPosition(
        bytes1 _letter,
        uint _position,
        bytes32 _salt
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_letter, _position, _salt));
    }

    function verifyWord(
        string memory _word,
        bytes32 _hash
    ) public pure returns (bool) {
        return keccak256(abi.encodePacked(_word)) == _hash;
    }

    function getGame(address player) public view returns (Game memory) {
        return games[player];
    }
}
