require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-contract-sizer');
require("hardhat-laika");

require('dotenv').config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 const data = require("./secrets.json");
 const INFURA_API_KEY = data.INFURA_API_KEY;
 const ROPSTEN_PRIVATE_KEY = data.ROPSTEN_PRIVATE_KEY;
 const ETHERSCAN_KEY = data.ETHERSCAN_KEY;

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  //defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      gasPrice: 50000000000,
      mining: {
        auto: true,
        interval: 0,
      },
      loggingEnabled: true,
      blockGasLimit: 12000000,
      accounts: [{privateKey: `${ROPSTEN_PRIVATE_KEY}`, balance: '100000000000000000000'}]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 90000000000,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      gasPrice: 90000000000, // 90 gwei
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
};
