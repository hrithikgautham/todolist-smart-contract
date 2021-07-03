import { Component } from "react";
import Web3 from "web3";

class Contract extends Component {

  state = { showLoader: true };

  static CONTRACT_ADDRESS = "0x416d378c96bd60712cb390c77435a3cb397a6a1a";
  static CONTRACT_ABI = [
    {
      inputs: [ [Object] ],
      stateMutability: 'nonpayable',
      type: 'constructor'
    },
    {
      inputs: [],
      name: 'message',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [ [Object] ],
      name: 'setMessage',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];

  async componentDidMount() {
    try {
      window.web3 = new Web3(window.ethereum);
      const account = window.web3.eth.defaultAccount = (await window.web3.eth.getAccounts())[0];
      const contract = await new window.web3.eth.Contract(Contract.CONTRACT_ABI, Contract.CONTRACT_ADDRESS);
      const message = await contract.methods.message().call();
      console.log("message: ", message);
      this.setState({ showLoader: false });
    } 
    catch(err) {
      console.log("error in componentDidMount()..!!");
      console.error(err);
      this.setState({ showLoader: false });
    }
  }

  render() {
    return (
      <div className="App">
         "hello"
      </div>
    );
  }
}

export default Contract;
