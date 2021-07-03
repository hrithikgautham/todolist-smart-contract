// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

contract TodoList {
    
  struct Todo {
    uint id;
    string name;
    string description;
    bool done;
  }
  
  event TodoAdded(string);
  event TodoComplete(string);
  event SendingTodos(Todo[]);

  address public owner;

  mapping(address => Todo[]) private todoListMap;

    constructor() {
        owner = msg.sender;
    }

  function getTodos() public returns(Todo[] memory) {
    emit SendingTodos(todoListMap[msg.sender]);
    return todoListMap[msg.sender];
  }

  function addTodo(string memory todoName,  string memory todoDesc) public {
    todoListMap[msg.sender].push(Todo(todoListMap[msg.sender].length + 1, todoName, todoDesc, false));
    emit TodoAdded("todo successfully added!");
  }
  
  function todoDone(uint id) public {
      require(id > 0 && id <= todoListMap[msg.sender].length);
      todoListMap[msg.sender][id-1].done = true;
      emit TodoComplete("todo complete!!");
  }
  
}