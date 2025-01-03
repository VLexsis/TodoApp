import React, { Component } from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

export default class Footer extends Component ({ tasks, filter }){
  const completedCount = tasks.filter((el) => el.completed).length;
  const todoCount = tasks.length - completedCount;
 


};

