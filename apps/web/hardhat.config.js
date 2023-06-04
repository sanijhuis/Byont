require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  networks: {
    localganache: {
      url: "HTTP://127.0.0.1:7545",
      accounts: [
        "0x33dc0313faa3a4f577a7c4de04fa58bbb452691f66ab852d36b857807a27d7b9",
      ],
    },
  },
};
