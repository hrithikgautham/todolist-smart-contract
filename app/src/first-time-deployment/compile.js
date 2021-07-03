const path = require('path');
const fs = require('fs');
const solc = require("solc");

const contractPath = path.join(__dirname, "..", "contracts", "TodoList.sol");
const sourceCode = fs.readFileSync(contractPath, "utf8");

var input = {
  language: 'Solidity',
  sources: {
    'TodoList.sol': {content : sourceCode}
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
};

const contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts["TodoList.sol"]["TodoList"];

console.log("abi: ", contract.abi);

module.exports = {
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object
}