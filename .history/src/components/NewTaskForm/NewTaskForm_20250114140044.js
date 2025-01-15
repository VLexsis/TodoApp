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
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log('Форма отправлена') // Отладка

        // Проверка на пустую задачу
        if (this.state.description.trim() === '') {
            console.log('Пустая задача не добавлена') // Отладка
            return
        }

        // Вызов функции onAddTask из пропсов
        this.props.onAddTask(this.state.description)

        // Очистка поля ввода
        this.setState({
            description: '',
        })
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
                <input className="new-todo-form__timer" placeholder="Min" />
                <input className="new-todo-form__timer" placeholder="Sec" />
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
