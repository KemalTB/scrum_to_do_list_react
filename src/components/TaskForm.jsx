import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [owner, setOwner] = useState('');
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && task && date) {
      addTask({ text: owner, task, date, });
      setOwner('');
      setTask('');
      setDate('');
      
    } else {
      alert('Please fill in all fields: Owner, Task, and Date.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        placeholder="Task Owner..."
      />
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write a new Task..."
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
