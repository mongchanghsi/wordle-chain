import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { mainnet, sepolia } from "viem/chains";
require("dotenv").config();

const ALCHEMY_SEPOLIA_API_KEY_URL =
  process.env.ALCHEMY_SEPOLIA_API_KEY_URL || "";
const ALCHEMY_MAINNET_API_KEY_URL =
  process.env.ALCHEMY_MAINNET_API_KEY_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
let PRIVATE_KEY = process.env.PRIVATE_KEY || "";

if (!PRIVATE_KEY) {
  console.log("⚠️ Please set PRIVATE_KEY in the .env file");
  throw Error();
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_API_KEY_URL,
      chainId: sepolia.id,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      url: ALCHEMY_MAINNET_API_KEY_URL,
      chainId: mainnet.id,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
  },
};

export default config;
