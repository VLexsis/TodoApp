import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddTask }) => {
    const [description, setDescription] = useState('')
    const [minutes, setMinutes] = useState('')
    const [seconds, setSeconds] = useState('')

    const onTaskChange = (event) => {
        setDescription(event.target.value)
    }

    const onTaskMinute = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            setMinutes(value)
        }
    }

    const onTaskSecond = (event) => {
        const value = event.target.value
        if (!isNaN(value) && value >= 0) {
            const secondsValue = Math.min(value, 59)
            setSeconds(secondsValue)
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        onAddTask(description, minutes, seconds)
        setDescription('')
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

NewTaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
    onAddTask: () => {},
}

export default NewTaskForm
