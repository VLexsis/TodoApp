import React, { Component } from 'react'

export default class TasksFilter extends Component {
    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' },
    ]
    render() {
        const buttons = this.buttons.map(({ name, label }) => {
            ;<li className="selected">
                <button type="button" key={name}>
                    {label}
                </button>
                ;
            </li>
        })
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
        )
    }
}
