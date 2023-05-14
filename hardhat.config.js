require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/TBwMOR69WJ-G_akpI0CNsI7srHYBJTDy",
      accounts: ["0xYOUR_PRIVATE_KEY"],
    },
  },
};
