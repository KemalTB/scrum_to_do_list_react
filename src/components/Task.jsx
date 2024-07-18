import React from 'react';

const Task = ({ task, status, moveTask, editTask, deleteTask, finishTask }) => {
  const handleMoveTask = (direction) => {
    moveTask(task, status, direction);
  };

  return (
    <div className="task" draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(task))}>
      <span onClick={() => handleMoveTask('next')}>
        <strong>{task.owner}</strong> - {task.text} ({task.date})
      </span>
      <div className="task-buttons">
        {status !== 'todo' && <button onClick={() => handleMoveTask('back')}>Back</button>}
        <button onClick={() => editTask(task, status)}>Edit</button>
        {status !== 'done' && <button onClick={() => deleteTask(task, status)}>Delete</button>}
        {/* <button onClick={() => deleteTask(task, status)}>Delete</button> */}
        {status !== 'done' && <button onClick={() => handleMoveTask('next')}>Next</button>}
        {status === 'done' && <button onClick={() => finishTask(task)}>Finish</button>}
      </div>
    </div>
  );
};

export default Task;
