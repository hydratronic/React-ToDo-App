import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
  // State to manage the input value
  const [value, setValue] = useState(task.task);

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call the editTodo function with the updated value and task id
    editTodo(value, task.id);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field for updating the task */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      {/* Button to submit the updated task */}
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
