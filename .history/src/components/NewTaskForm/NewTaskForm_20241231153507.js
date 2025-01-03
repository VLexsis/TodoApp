import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'

export default class NewTaskForm extends Component {
    state = {
        description: '',
    }

    onTaskChange = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onAddTask(this.state.description)
        this.setState({
            description: '',
        })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onTaskChange}
                />
            </form>
        )
    }
}

NewTaskForm.defaultProps = {
    onAddTask: () => {},
}

TaskList.defaultProps = {
    tasks: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    onEdit: () => {},
    onToggleEdit: () => {},
}
