const path = require('path');
const fs = require('fs');
const solc = require("solc");

const contractPath = path.join(__dirname, "..", "contracts", "Inbox.sol");
const sourceCode = fs.readFileSync(contractPath, "utf8");

var input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {content : sourceCode}
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
};

const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts["Inbox.sol"]["Inbox"];

console.log("abi: ", contract.abi);

module.exports = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object
}