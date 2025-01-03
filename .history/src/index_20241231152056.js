import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { formatDistanceToNow } from "date-fns";
import "./index.css";

import NewTaskForm from "./components/NewTaskForm/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";
import Footer from "./components/Footer/Footer";

export default class App extends Component {
  maxId = 1;

  createNewTask = (description) => {
    return {
      id: this.maxId++,
      description: description,
      created: new Date(),
      completed: false,
      editing: false, // Добавляем поле editing
    };
  };

  state = {
    tasks: [
      this.createNewTask("Completed task"),
      this.createNewTask("Editing task"),
      this.createNewTask("Active task"),
    ],
    filter: "all",
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      return { tasks: tasks.toSpliced(idx, 1) };
    });
  };

  onAddTask = (text) => {
    const newTask = this.createNewTask(text);

    this.setState(({ tasks }) => {
      const newArr = [...tasks, newTask];
      return {
        tasks: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldTask = arr[idx];
    const newItem = { ...oldTask, [propName]: !oldTask[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, "completed"),
      };
    });
  };

  handleToggleEdit = (taskId) => {
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, taskId, "editing"),
      };
    });
  };

  filter(tasks, filter) {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };
    deleteAllTasks = () => {
    this.setState({ tasks: [] }); // Удаляем все задачи
  };
  };
  onEdit = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, description: newDescription } : task
      );
      return { tasks: updatedTasks };
    });
  };

  render() {
    const { filter, tasks } = this.state;
    const visibleTasks = this.filter(tasks, filter);
  
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAddTask={this.onAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.handleToggleEdit}
            onEdit={this.onEdit}
          />
          <Footer
            tasks={tasks}
            filter={filter}
            onFilterChange={this.onFilterChange}
            deleteAllTasks={this.deleteAllTasks} // Оставляем только deleteAllTasks
          />
        </section>
      </section>
    );
  }


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
