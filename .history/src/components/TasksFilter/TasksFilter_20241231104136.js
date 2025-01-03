import React, { Component } from 'react'

export default class TasksFilter extends Component {
    buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' },
    ]
    render() {
        const buttons = this.buttons.map(({ name, label }) => {
            ;<button type="button" key={name}>
                {label}
            </button>
        })
        return <ul className="filters">{buttons}</ul>
    }
}
