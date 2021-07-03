const WalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const walletProvider = new WalletProvider(
  "bitter repair century thumb such kit huge math joke genre eagle beef", 
  "https://ropsten.infura.io/v3/23d30c81486d4e23a798041525425d26"
);

const web3 = new Web3(walletProvider);

let accounts, contract;

const CONTRACT_ADDRESS = "0xdefd6fe0b61bf55fd12183f4820dd9e5011b645b";

async function deploy() {
  try {

    accounts = await web3.eth.getAccounts();

    console.log("deployer account: ", accounts[0]);

    // contract = await new web3.eth.Contract(abi)
    //   .deploy({ data: bytecode, arguments: [] })
    //   .send({ from: accounts[0], gas: "1000000" });

    contract = await new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const message = await contract.methods.getTodos().send({ from: accounts[0] });
    console.log("message: ", message.events.SendingTodos.returnValues);
  }
  catch(err) {
    console.error(err);
    // contract = await new web3.eth.Contract(abi)
    //   .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    //   .send({ from: accounts[0], gas: "1000000" });
  }
}

deploy();