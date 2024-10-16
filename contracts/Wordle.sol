// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Wordle {
    bytes32 private solutionCommitment;
    address public owner;
    bool public gameEnded;
    string private revealedSolution;

    struct Guess {
        string word;
        uint8 correctLetters;
        uint8 correctPositions;
        uint8[5] resultArray;
    }

    mapping(address => Guess[]) private guesses;
    mapping(address => uint256) public correctGuesses;

    event GameStarted(bytes32 commitment, uint256 timestamp);
    event WordGuessed(address indexed player, string word);
    event GuessesProcessed(address indexed player, Guess[] results);
    event GameEnded(uint256 timestamp);
    event SolutionRevealed(string solution);

    constructor() {
        owner = msg.sender;
        gameEnded = true; // Game initially inactive
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier gameNotEnded() {
        require(!gameEnded, "Game has already ended");
        _;
    }

    function startGame(bytes32 _commitment) external onlyOwner {
        require(gameEnded, "Game is already in progress");
        solutionCommitment = _commitment;
        revealedSolution = "";
        gameEnded = false;
        emit GameStarted(solutionCommitment, block.timestamp);
    }

    function revealSolution(string memory _solution, string memory _salt) external onlyOwner gameNotEnded {
        require(bytes(_solution).length == 5, "Solution must be 5 letters");
        bytes32 computedCommitment = keccak256(abi.encodePacked(_solution, _salt));
        require(computedCommitment == solutionCommitment, "Invalid solution or salt");

        revealedSolution = _solution;
        gameEnded = true;
        emit SolutionRevealed(_solution);
        emit GameEnded(block.timestamp);

        // Process all guesses now that the solution is revealed
        processAllGuesses();
    }

    function processAllGuesses() private {
        // For each player, process their guesses
        // Note: For large numbers of players, this could be gas-intensive
        // In a real-world scenario, you might limit the number of players or process guesses off-chain
        for (uint256 i = 0; i < players.length; i++) {
            address player = players[i];
            Guess[] storage playerGuesses = guesses[player];
            for (uint256 j = 0; j < playerGuesses.length; j++) {
                Guess storage playerGuess = playerGuesses[j];
                (uint8 correctLetters, uint8 correctPositions, uint8[5] memory resultArray) = compareWords(
                    playerGuess.word,
                    revealedSolution
                );
                playerGuess.correctLetters = correctLetters;
                playerGuess.correctPositions = correctPositions;
                playerGuess.resultArray = resultArray;

                if (correctPositions == 5) {
                    correctGuesses[player]++;
                }
            }
            emit GuessesProcessed(player, playerGuesses);
        }
    }

    function compareWords(string memory guess, string memory solution)
        internal
        pure
        returns (
            uint8 correctLetters,
            uint8 correctPositions,
            uint8[5] memory resultArray
        )
    {
        bool[5] memory solutionCharUsed;
        bool[5] memory guessCharUsed;

        bytes memory solutionBytes = bytes(solution);
        bytes memory guessBytes = bytes(guess);

        // First pass: correct positions
        for (uint8 i = 0; i < 5; i++) {
            if (guessBytes[i] == solutionBytes[i]) {
                resultArray[i] = 2;
                solutionCharUsed[i] = true;
                guessCharUsed[i] = true;
                correctPositions++;
            }
        }

        // Second pass: correct letters in wrong positions
        for (uint8 i = 0; i < 5; i++) {
            if (!guessCharUsed[i]) {
                for (uint8 j = 0; j < 5; j++) {
                    if (!solutionCharUsed[j] && guessBytes[i] == solutionBytes[j]) {
                        resultArray[i] = 1;
                        solutionCharUsed[j] = true;
                        guessCharUsed[i] = true;
                        correctLetters++;
                        break;
                    }
                }
            }
        }
    }

    address[] private players;

    // Override the guessWord function to keep track of players
    function guessWord(string memory _guess) external gameNotEnded {
        require(bytes(_guess).length == 5, "Word must be 5 characters long");
        require(solutionCommitment != bytes32(0), "Game has not started");

        // Store the guess
        guesses[msg.sender].push(Guess(_guess, 0, 0, [uint8(0), 0, 0, 0, 0]));

        // Add player to the list if not already present
        if (guesses[msg.sender].length == 1) {
            players.push(msg.sender);
        }

        emit WordGuessed(msg.sender, _guess);
    }

    // Function to get the number of correct guesses for a player
    function getCorrectGuesses(address player) external view returns (uint256) {
        return correctGuesses[player];
    }

    // Function to get guesses for a player
    function getGuesses(address player) external view returns (Guess[] memory) {
        return guesses[player];
    }

    function processMyGuesses() external {
    require(gameEnded, "Game has not ended");
    require(bytes(revealedSolution).length == 5, "Solution not revealed");

    Guess[] storage playerGuesses = guesses[msg.sender];
    for (uint256 j = 0; j < playerGuesses.length; j++) {
        Guess storage playerGuess = playerGuesses[j];
        if (playerGuess.correctPositions == 0 && playerGuess.correctLetters == 0) {
            (uint8 correctLetters, uint8 correctPositions, uint8[5] memory resultArray) = compareWords(
                playerGuess.word,
                revealedSolution
            );
            playerGuess.correctLetters = correctLetters;
            playerGuess.correctPositions = correctPositions;
            playerGuess.resultArray = resultArray;

            if (correctPositions == 5) {
                correctGuesses[msg.sender]++;
            }
        }
    }

    emit GuessesProcessed(msg.sender, playerGuesses);
}

}
