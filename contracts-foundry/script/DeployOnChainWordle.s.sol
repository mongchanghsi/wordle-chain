// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/WordleV2.sol";

contract DeployWordleV2 is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address authorityAddress = vm.envAddress("AUTHORITY_ADDRESS");

        // Print out the authority address before deployment
        console.log("Authority Address to be set:", authorityAddress);

        vm.startBroadcast(deployerPrivateKey);

        WordleV2 wordleV2 = new WordleV2(authorityAddress);

        console.log("WordleV2 deployed to:", address(wordleV2));
        console.log("Authority address set to:", authorityAddress);

        vm.stopBroadcast();
    }
}
