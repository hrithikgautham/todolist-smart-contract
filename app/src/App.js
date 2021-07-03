import { Component } from "react";
import Web3 from "web3";
import Loading from "./components/Loading/Loading";
import TodoForm from "./components/TodoForm/TodoForm";

class Contract extends Component {

  state = { showLoader: true };

  static CONTRACT_ADDRESS = "0xBdEbc8881F4b16f61E3229d28b7efB901E58626e";
  static CONTRACT_ABI = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [ [Object], [Object] ],
      name: 'addTodo',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getTodos',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [ [Object] ],
      name: 'todoDone',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];

  async componentDidMount() {
    try {
      window.web3 = new Web3(window.ethereum);
      const account = window.web3.eth.defaultAccount = (await window.web3.eth.getAccounts())[0]
      const contract = await new window.web3.eth.Contract(Contract.CONTRACT_ABI, Contract.CONTRACT_ADDRESS);
      const todos = await contract.methods.getTodos().send({ from: account });
      // const owner = await contract.methods.owner().call();
      this.setState({ contract, account, todos, showLoader: false });
      console.log("this.state: ", this.state)
      window.todos = todos;
      console.log("response: ", todos.events.UserRegisterEVENT.returnValues);
      // console.log("owner ", owner)
    }
    catch(err) {
      console.log("error in componentDidMount()..!!");
      console.error(err);
      this.setState({ showLoader: false });
    }
  }

  addTodo = async (name, description) => {
    try {
      console.log("name: ", name, "description: ", description)
      this.setState({ showLoader: true });
      const contract = this.state.contract;
      const method = contract.methods.addTodo({name}, {description});
      console.log("method: ", method);
      const callbackMessage = await method.send({ from: this.state.account, gas: 2000000, gasPrice: "100000000000" });
      console.log("callbackMessage: ", callbackMessage)
      this.setState({ showLoader: false });
    }
    catch(err) {
      console.log("error in addTodo()...");
      console.error(err);
      this.setState({ showLoader: false });
    }
  }

  async fetchTodos() {
    const contract = this.state.contract;
    // const callbackMessage = await contract.methods.setMessage("Modified Message").send({ from: accounts[0] });
    const todos = await contract.methods.getTodos().call();
    this.setState({ todos });
  }

  render() {
    return (
      <div className="App">
         { this.state.showLoader && <Loading /> }
          <TodoForm addTodo={this.addTodo}/>
         {/* <TodoList /> */}
      </div>
    );
  }
}

export default Contract;
