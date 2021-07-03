import "./TodoForm.css";
import React, { useState } from 'react';

function TodoForm({ addTodo }) {

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function onClickHandler() {
    addTodo(name, desc);
    setName("");
    setDesc("");
  }

  return (
    <div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} name="todo-name" type="text" />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} name="todo-desc" type="text" />
      </div>
      <button onClick={onClickHandler}>Add Todo</button>
    </div>
  )
}

export default TodoForm;