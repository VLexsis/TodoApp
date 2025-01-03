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

      const isActive = filter ==== name;
      <li className="selected">
        <button key={name}>{label}</button>;
      </li>;
    });
    return (
      <ul className="filters">
        <li>{buttons}</li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}
