const express = require("express");
const app = express();
const cors = require("cors");
const Buffer = require("buffer");
const fs = require("fs");
const secp = require("@noble/secp256k1");
const SHA256 = require("crypto-js/sha256");
const bodyParser = require("body-parser");
const ethers = require("ethers");
const path = require("path");
const ganache = require("ganache");
const util = require("util");
require("dotenv").config();

const readFile = util.promisify(fs.readFile);

const mainnet_provider = new ethers.providers.JsonRpcProvider(
  process.env.MAINNET_URL
);

const goerli_provider = new ethers.providers.JsonRpcProvider(
  process.env.GOERLI_URL
);

const rinkeby_provider = new ethers.providers.JsonRpcProvider(
  process.env.RINKEBY_URL
);

const ropsten_provider = new ethers.providers.JsonRpcProvider(
  process.env.ROPSTEN_URL
);

const getNetworkProvider = (network) => {
  if (network === "mainnet") {
    return mainnet_provider;
  } else if (network === "goerli") {
    return goerli_provider;
  } else if (network === "rinkeby") {
    return rinkeby_provider;
  } else if (network === "ropsten") {
    return ropsten_provider;
  }
};

// const GANACHE_PORT = 7545;

// const provider = new ethers.providers.Web3Provider(
//   ganache.provider({
//     total_accounts: 100,
//     port: GANACHE_PORT,
//     account_keys_path: "./accounts.json",
//     //   db_path: "./db.json",
//     defaultGasPrice: 20000000000,
//     blockGasLimit: 30000000,
//     // defaultBalance: 100,
//   })
// );

// (async function setUp() {
//   let credentials = await readFile("./accounts.json", "binary");
//   credentials = JSON.parse(credentials);

//   const private_keys = Object.values(credentials.private_keys);
//   const addresses = Object.keys(credentials.addresses);

//   for (let i = 0; i < addresses.length - 1; i++) {
//     const wallet = new ethers.Wallet(private_keys[i], provider);

//     await wallet.sendTransaction({
//       value: ethers.utils.parseEther("1.0"),
//       to: addresses[i + 1],
//     });
//   }

//   for (let i = addresses.length - 1; i > 0; i--) {
//     const wallet = new ethers.Wallet(private_keys[i], provider);

//     await wallet.sendTransaction({
//       value: ethers.utils.parseEther("3.0"),
//       to: addresses[i - 1],
//     });
//   }

//   for (let i = 0; i < addresses.length - 1; i++) {
//     const wallet = new ethers.Wallet(private_keys[i], provider);

//     await wallet.sendTransaction({
//       value: ethers.utils.parseEther("5.0"),
//       to: addresses[i + 1],
//     });
//   }

//   for (let i = addresses.length - 1; i > 0; i--) {
//     const wallet = new ethers.Wallet(private_keys[i], provider);

//     await wallet.sendTransaction({
//       value: ethers.utils.parseEther("10.0"),
//       to: addresses[i - 1],
//     });
//   }
// })();

const port = 3042;

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

app.get("/balance", async function (req, res) {
  const { network, address } = req.query;
  const provider = getNetworkProvider(network);
  const balance = await provider.getBalance(address);
  res.send(balance);
});

app.get("/accounts", async function (req, res) {
  const { network } = req.query;

  const provider = getNetworkProvider(network);
  const accounts = await provider.listAccounts();

  res.send({
    result: {
      accounts,
    },
  });
});

app.get("/transactions", async function (req, res) {
  let { network } = req.query;
  network = network.toLowerCase();

  const provider = getNetworkProvider(network);
  const blockNum = await provider.getBlockNumber();
  const block = await provider.getBlockWithTransactions(blockNum);

  res.send({
    result: {
      transactions: block.transactions,
    },
  });
});

app.get("/transaction", async function (req, res) {
  const { transactionHash, network } = req.query;
  const provider = getNetworkProvider(network.toLowerCase());
  const transaction = await provider.getTransaction(transactionHash);

  res.send({
    result: transaction,
  });
});

app.get("/account", async function (req, res) {
  const { network, address } = req.query;

  const provider = getNetworkProvider(network);
  const balance = await provider.getBalance(address);

  res.send({
    result: {
      ethAmount: ethers.utils.formatEther(balance),
      address,
    },
  });
});

app.get("/blocks", async function (req, res) {
  let { network } = req.query;
  network = network.toLowerCase();

  const provider = getNetworkProvider(network);
  const blockNum = await provider.getBlockNumber();

  const blocks = [];

  for (let i = blockNum; i >= blockNum - 10; i--) {
    const block = await provider.getBlock(i);
    blocks.push(block);
  }

  res.send({
    result: blocks,
  });
});

app.get("/block", async function (req, res) {
  const { blockNum, network } = req.query;
  const provider = getNetworkProvider(network.toLowerCase());
  const block = await provider.getBlock(blockNum);

  console.log("get block ", block);

  res.send({
    result: block,
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
