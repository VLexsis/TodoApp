import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
    state = {
        description: '',
        minutes: '',
        seconds: '',
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
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="Task"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onTaskChange}
                />
                <input className="new-todo-form__timer" placeholder="Min" value={this.state}autoFocus />
                <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
                <button type="submit"></button>
            </form>
        )
    }
}

NewTaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
    onAddTask: () => {},
}
