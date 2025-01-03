import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = ({ tasks, filter, onFilterChange }) => {
  const completedCount = tasks.filter((el) => el.completed).length;
  const todoCount = tasks.length - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onDeleteAllTasks={}>Clear completed</button>
    </footer>
  );
};

export default Footer;
