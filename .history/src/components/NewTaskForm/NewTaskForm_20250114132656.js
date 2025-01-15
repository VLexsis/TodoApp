import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
    state = {
        description: '',
    }

    onTaskChange = (event) => {
        this.setState({
            description: event.target.value,
        })
        console.log('Текст задачи:', event.target.value) // Отладка
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onAddTask(this.state.description)
        this.setState({
            description: '',
        })
        console.log('Текст задачи:', event.target.value) // Отладка
    }
    render() {
        return (
            <form className="new-todo-form" onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onTaskChange}
                />
                <input className="new-todo-form__timer" placeholder="Min" autofocus />
                <input className="new-todo-form__timer" placeholder="Sec" autofocus />
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
