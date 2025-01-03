import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ task, onDelete, onEdit, onToggleEdit, onToggleDone }) => {
    const formattedDate = formatDistanceToNow(task.created, { addSuffix: true })

    const handleEdit = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            onEdit(task.id, e.target.value)
            onToggleEdit(task.id) // Выход из режима редактирования
        }
    }

    return (
        <li className={task.completed ? 'completed' : task.editing ? 'editing' : ''}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleDone(task.id)} // Используем onChange
                />
                <label>
                    <span className="description" onClick={() => onToggleDone(task.id)}>
                        {task.description}
                    </span>
                    <span className="created">{formattedDate}</span>
                </label>
                <button className="icon icon-edit" onClick={() => onToggleEdit(task.id)}></button>
                <button className="icon icon-destroy" onClick={() => onDelete(task.id)}></button>
            </div>
            {task.editing && (
                <input
                    type="text"
                    className="edit"
                    defaultValue={task.description}
                    onBlur={handleEdit}
                    onKeyDown={handleEdit}
                    autoFocus
                />
            )}
        </li>
    )
}

export default Task
