import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && date && owner) {
      addTask({ text: task, date, owner });
      setTask('');
      setDate('');
      setOwner('');
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
        placeholder="Owner"
      />
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task"
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
