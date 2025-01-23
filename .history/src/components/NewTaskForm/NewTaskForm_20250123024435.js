import React, { useState } from 'react'
import PropTypes from 'prop-types'



const  NewTaskForm = () => {
    const [description, setDescription] = useState('')
    
}

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

    onTaskMinute = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            // Проверяем, что введено число
            this.setState({
                minutes: value,
            })
        }
    }

    onTaskSecond = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            const seconds = Math.min(value, 59)
            this.setState({
                seconds: seconds,
            })
        }
    }
    onSubmit = (event) => {
        event.preventDefault()
        const { description, minutes, seconds } = this.state
        this.props.onAddTask(description, minutes, seconds) // Передаем все данные
        this.setState({
            description: '',
            minutes: '',
            seconds: '',
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
                <input
                    className="new-todo-form__timer"
                    placeholder="Min"
                    value={this.state.minutes}
                    onChange={this.onTaskMinute}
                    autoFocus
                />
                <input
                    className="new-todo-form__timer"
                    placeholder="Sec"
                    max="59"
                    value={this.state.seconds}
                    onChange={this.onTaskSecond}
                    autoFocus
                />
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
