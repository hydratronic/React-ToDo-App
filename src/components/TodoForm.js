import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  // State to manage the input value
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    if (value) {
      // Call the addTodo function to add a new task
      addTodo(value);
      // Clear the form after submission
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field for entering the task */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      {/* Button to submit the new task */}
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
