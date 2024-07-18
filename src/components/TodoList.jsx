import React from 'react';
import TaskForm from './TaskForm';
import Task from './Task';

const TodoList = ({ tasks, setTasks, addTask }) => {
  const moveTask = (task, currentStatus, direction) => {
    const statusOrder = ['todo', 'inProgress', 'check', 'done'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0 || newIndex >= statusOrder.length) return;

    const newStatus = statusOrder[newIndex];
    const updatedTasks = {
      ...tasks,
      [currentStatus]: tasks[currentStatus].filter((t) => t !== task),
      [newStatus]: [...tasks[newStatus], task]
    };
    setTasks(updatedTasks);
  };

  const editTask = (task, status) => {
    const newTaskOwner = prompt('Edit task owner:', task.owner);
    const newTaskText = prompt('Edit task:', task.text);
    const newTaskDate = prompt('Edit due date (YYYY-MM-DD):', task.date);
    

    if (newTaskText && newTaskDate && newTaskOwner) {
      const updatedTasks = {
        ...tasks,
        [status]: tasks[status].map((t) =>
          t === task ? { ...task, text: newTaskText, date: newTaskDate, owner: newTaskOwner } : t
        )
      };
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (task, status) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = {
        ...tasks,
        [status]: tasks[status].filter((t) => t !== task)
      };
      setTasks(updatedTasks);
    }
  };

  const finishTask = (task) => {
    if (window.confirm('Are you sure you want to finish this task?')) {
      const updatedTasks = {
        ...tasks,
        done: tasks.done.filter((t) => t !== task)
      };
      setTasks(updatedTasks);
    }
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData('text/plain');
    const task = JSON.parse(taskData);

    const currentStatus = Object.keys(tasks).find((status) =>
      tasks[status].some((t) => t.text === task.text && t.date === task.date && t.owner === task.owner)
    );

    if (currentStatus && currentStatus !== newStatus) {
      moveTask(task, currentStatus, newStatus);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <TaskForm addTask={addTask} />
      <div className="board">
        {Object.keys(tasks).map((status) => (
          <div
            key={status}
            className="column"
            onDrop={(e) => handleDrop(e, status)}
            onDragOver={allowDrop}
          >
            <h2>{status.toUpperCase()}</h2>
            <div id={`${status}-list`} className="task-list">
              {tasks[status].map((task) => (
                <Task
                  key={task.text + task.date + task.owner}
                  task={task}
                  status={status}
                  moveTask={moveTask}
                  editTask={editTask}
                  deleteTask={deleteTask}
                  finishTask={finishTask}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
