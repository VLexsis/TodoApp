import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddTask }) => {
    // Состояния для каждого поля
    const [description, setDescription] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    // Обработчик изменения поля "Описание"
    const onTaskChange = (event) => {
        setDescription(event.target.value)
    }

    // Обработчик изменения поля "Минуты"
    const onTaskMinute = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            // Проверяем, что введено число
            setMinutes(value)
        }
    }

    // Обработчик изменения поля "Секунды"
    const onTaskSecond = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            // Проверяем, что введено число
            const secondsValue = Math.min(value, 59) // Ограничиваем значение до 59
            setSeconds(secondsValue)
        }
    }

    // Обработчик отправки формы
    const onSubmit = (event) => {
        event.preventDefault()
        onAddTask(description, minutes, seconds) // Передаем данные
        setDescription('') // Сбрасываем поля
        setMinutes('')
        setSeconds('')
    }

    return (
        <form className="new-todo-form" onSubmit={onSubmit}>
            <input className="new-todo" placeholder="Task" autoFocus value={description} onChange={onTaskChange} />
            <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={onTaskMinute} />
            <input
                className="new-todo-form__timer"
                placeholder="Sec"
                max="59"
                value={seconds}
                onChange={onTaskSecond}
            />
            <button type="submit"></button>
        </form>
    )
}

// Проверка пропсов
NewTaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
