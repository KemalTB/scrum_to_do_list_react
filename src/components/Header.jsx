import React from 'react';
import todoLogo from '../assets/todo_logo.jpg';

const Header = () => {
  return (
    <div className="header">
      <img src={todoLogo} alt="Todo Logo" style={{ display: 'block', margin: '0 auto', maxWidth: '100px' }} />
      <h1>Scrum - To Do List</h1>
    </div>
  );
};

export default Header;

