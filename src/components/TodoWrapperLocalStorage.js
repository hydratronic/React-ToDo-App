import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapperLocalStorage = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from local storage on component mount
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = (todo) => {
    // Add a new todo to the list
    const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
    setTodos(newTodos);
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const toggleComplete = (id) => {
    // Toggle the completion status of a todo
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(newTodos);
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const deleteTodo = (id) => {
    // Delete a todo from the list
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  const editTodo = (id) => {
    // Toggle the editing status of a todo
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  }

  const editTask = (task, id) => {
    // Edit the task of a todo
    const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    setTodos(newTodos);
    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      {/* Form to add new todos */}
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      )}
    </div>
  );
}
