import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const getNextId = () => {
    const maxId = todos.reduce((max, todo) => (todo.id > max ? todo.id : max), 0);
    return maxId + 1;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: getNextId(),
        title: inputValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleEditTodo = (id, title) => {
    setEditingTodoId(id);
    setInputValue(title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodoId ? { ...todo, title: inputValue } : todo
    );

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setInputValue('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
  };

  return (
    <div className="outer-page">
      <div className="container inner-page">
        <h1>Todo List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="form-control input-box"
          />
          <div className="input-group-append">
            <button
              onClick={editingTodoId ? handleUpdateTodo : handleAddTodo}
              className="btn btn-primary"
            >
              {editingTodoId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item ${todo.completed ? 'completed' : ''}`}
            >
              <div className="form-check">
                <div className="text">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="form-check-input"
                  />
                  <label
                    className={`form-check-label ${todo.completed ? 'completed' : ''}`}
                  >
                    {todo.title}
                  </label>
                </div>
                <div className="button-group">
                  <button
                    onClick={() => handleEditTodo(todo.id, todo.title)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
