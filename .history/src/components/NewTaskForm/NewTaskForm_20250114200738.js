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
        console.log('Текст задачи:', event.target.value) // Отладка
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log('Форма отправлена') // Отладка

        if (this.state.description.trim() === '') {
            console.log('Пустая задача не добавлена') // Отладка
            return
        }
        onMinutesChange = (event) => {
            this.setState({
                minutes: event.target.value,
            })
        }
        onSecondsChange = (event) => {
            this.setState({
                seconds: event.target.value,
            })
        }
        this.props.onAddTask(this.state.description)
        this.setState({
            description: '',
        })
    }
    render() {
        return (
            <form className="new-todo-new" onSubmit={this.onSubmit}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    value={this.state.description}
                    onChange={this.onTaskChange}
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Min"
                    value={this.state.minutes}
                
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    value={this.state.seconds}
                   
                />
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
