import React, { Component } from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

export default class Footer extends Component ({ tasks, filter }){
  const completedCount = tasks.filter((el) => el.completed).length;
  const todoCount = tasks.length - completedCount;
  filter(tasks, filter) {
    switch (filter) {
      case "all":
        return tasks; 
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        tasks;
    }
  }


};

