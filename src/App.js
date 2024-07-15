import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    check: [],
    done: []
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const storedTasks = {
      todo: JSON.parse(localStorage.getItem('todoTasks')) || [],
      inProgress: JSON.parse(localStorage.getItem('inProgressTasks')) || [],
      check: JSON.parse(localStorage.getItem('checkTasks')) || [],
      done: JSON.parse(localStorage.getItem('doneTasks')) || []
    };
    setTasks(storedTasks);
  };

  const saveTasks = (updatedTasks) => {
    localStorage.setItem('todoTasks', JSON.stringify(updatedTasks.todo));
    localStorage.setItem('inProgressTasks', JSON.stringify(updatedTasks.inProgress));
    localStorage.setItem('checkTasks', JSON.stringify(updatedTasks.check));
    localStorage.setItem('doneTasks', JSON.stringify(updatedTasks.done));
  };

  const addTask = (newTask) => {
    const updatedTasks = { ...tasks, todo: [...tasks.todo, newTask] };
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <div className="container">
      <Header />
      <TodoList tasks={tasks} setTasks={updateTasks} addTask={addTask} />
    </div>
  );
};

export default App;
