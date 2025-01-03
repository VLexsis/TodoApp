import React, { Component } from "react";

export default class TasksFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];
  render() {
    const { filter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const class = isActive ? "selected" : "";
      <li key={name}>
        <button className = {class}>{label}</button>;
      </li>;
    });
    return (
      <ul className="filters">
        {buttons}
      </ul>
    );
  }
}