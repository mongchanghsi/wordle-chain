// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/WordleV2.sol";

contract WordleV2Test is Test {
    OnChainWordle public wordle;
    address public constant AUTHORITY_ADDRESS =
        address(0x8eDD0168dcE334BA10591f44470Cca1F03b8dEBF);
    address public player = address(0x8eDD0168dcE334BA10591f44470Cca1F03b8dEBF);

    bytes32 public constant WORD_HASH =
        0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8;
    bytes32[5] public LETTER_CODES = [
        bytes32(
            0x598f725ca97ccf1129653c27bfa2910fd4b108a571cc213e7226f35ae5c4ab12
        ),
        bytes32(
            0x73325b4103f156a08c4ce750b846b9ed12b209f1fb5ff789898dfb566d796b90
        ),
        bytes32(
            0xec6a74bcc3e90aca437bb3c2056ab4a3fa4a0ae4a71c8a11c4d4700324ed61e4
        ),
        bytes32(
            0x5d162e4060db500f617743774e90cc74e86d1af8327bea5143813c087b1d4334
        ),
        bytes32(
            0xd5f93725c4d7edaa0cf67927e4b135ba538b44dc7ee0b7544cdf0edb232bc534
        )
    ];
    bytes32 public constant SALT =
        0x2c942830d5ad72c00ae698dc1c4e41df8bd3eda6b2c10b9f728ae41dc4ae4389;
    bytes public constant SIGNATURE =
        hex"226d0e7901b576e0adcf796b5c82d82647cd6b4691c29fb955a3c4aed0eb469b264f78e1a73a7021a82dc4709a6cb4a0abb5ee00fa28c91245e8d9023f23441e1b";

    function setUp() public {
        vm.prank(AUTHORITY_ADDRESS);
        wordle = new OnChainWordle(AUTHORITY_ADDRESS);
        vm.deal(player, 1 ether);

        // Print out the authority address
        console.log("Authority Address:", AUTHORITY_ADDRESS);
    }

    function testStartNewGame() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        OnChainWordle.Game memory game = wordle.getGame(player);
        assertEq(game.wordHash, WORD_HASH);
        assertEq(game.attemptsLeft, 5);
        assertFalse(game.completed);
        for (uint i = 0; i < 5; i++) {
            assertEq(game.letterCodes[i], LETTER_CODES[i]);
        }
        assertEq(game.salt, SALT);
    }

    function testStartNewGameInvalidSignature() public {
        bytes memory invalidSignature = hex"deadbeef";
        vm.prank(player);
        vm.expectRevert(
            abi.encodeWithSelector(
                ECDSA.ECDSAInvalidSignatureLength.selector,
                4
            )
        );
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, invalidSignature);
    }

    function testMakeGuess() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        vm.prank(player);
        wordle.makeGuess("wrong"); // Change this to a wrong guess

        OnChainWordle.Game memory game = wordle.getGame(player);
        assertEq(game.attemptsLeft, 4);
        assertFalse(game.completed);
    }

    function testMakeGuessWinGame() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        // Assuming "hello" is the correct word
        bytes32 correctWordHash = keccak256(abi.encodePacked("hello"));
        assertEq(
            WORD_HASH,
            correctWordHash,
            "Test setup: WORD_HASH should be hash of 'hello'"
        );

        vm.expectEmit(true, false, false, false);
        emit OnChainWordle.GameWon(player);
        vm.prank(player);
        wordle.makeGuess("hello");

        OnChainWordle.Game memory game = wordle.getGame(player);
        assertTrue(game.completed);
    }

    function testMakeGuessLoseGame() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        for (uint i = 0; i < 4; i++) {
            vm.prank(player);
            wordle.makeGuess("wrong");
        }

        vm.expectEmit(true, false, false, false);
        emit OnChainWordle.GameLost(player);
        vm.prank(player);
        wordle.makeGuess("wrong");

        OnChainWordle.Game memory game = wordle.getGame(player);
        assertEq(game.attemptsLeft, 0);
        assertTrue(game.completed);
    }

    function testVerifyWord() public {
        string memory word = "hello";
        bytes32 hash = keccak256(abi.encodePacked(word));
        assertTrue(wordle.verifyWord(word, hash));
        assertFalse(wordle.verifyWord("wrong", hash));
    }

    function testCannotStartNewGameBeforeFinishing() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        vm.expectRevert("Finish your current game first");
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);
    }

    function testCannotMakeGuessAfterGameCompleted() public {
        vm.prank(player);
        wordle.startNewGame(WORD_HASH, LETTER_CODES, SALT, SIGNATURE);

        // Lose the game
        for (uint i = 0; i < 5; i++) {
            vm.prank(player);
            wordle.makeGuess("wrong");
        }

        vm.expectRevert("No more attempts left"); // Updated error message
        vm.prank(player);
        wordle.makeGuess("hello");
    }
}
