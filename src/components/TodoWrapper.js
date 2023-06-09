import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Function to fetch todos from the API
  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();
      const todosWithTitles = data.map((todo) => ({
        id: todo.id,
        task: todo.title, // Extract the title field from the API response
        completed: todo.completed,
        isEditing: false,
      }));
      setTodos(todosWithTitles);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo
  const addTodo = async (todo) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo,
          completed: false,
        }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to toggle the completion status of a todo
  const toggleComplete = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);

      // Make PUT request to update the completion status
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodos.find((todo) => todo.id === id)),
      });
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  // Function to toggle the editing status of a todo
  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit the task of a todo
  const editTask = async (task, id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      );
      setTodos(updatedTodos);

      // Make PUT request to update the task
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodos.find((todo) => todo.id === id)),
      });
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      {/* Form to add new todos */}
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
