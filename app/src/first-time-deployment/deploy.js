const WalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

const walletProvider = new WalletProvider(
  "bitter repair century thumb such kit huge math joke genre eagle beef", 
  "https://ropsten.infura.io/v3/23d30c81486d4e23a798041525425d26"
);

const web3 = new Web3(walletProvider);

let accounts, contract;

const CONTRACT_ADDRESS = "0x416d378c96bd60712cb390c77435a3cb397a6a1a";

async function deploy() {
  try {

    accounts = await web3.eth.getAccounts();

    console.log("deployer account: ", accounts[0]);

    // contract = await new web3.eth.Contract(abi)
    //   .deploy({ data: bytecode, arguments: ["Hello World!!!"] })
    //   .send({ from: accounts[0], gas: "1000000" });

    contract = await new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    const method = contract.methods.setMessage("gheisenberg");
    console.log(method)
    console.log(await method.send({from: accounts[0]}));
    const message = await contract.methods.message().call();
    console.log("message: ", message);
  }
  catch(err) {
    console.error(err);
    // contract = await new web3.eth.Contract(abi)
    //   .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    //   .send({ from: accounts[0], gas: "1000000" });
  }
}

deploy();