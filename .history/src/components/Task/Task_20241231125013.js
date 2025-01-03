import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ task, onToggle, onDelete }) => {
    const formattedDate = formatDistanceToNow(task.created, { addSuffix: true })

    return (
        <li className={task.completed ? 'completed' : task.editing ? 'editing' : ''}>
            <div className="view">
                <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
                <label>
                    <span className="description">{task.description}</span>
                    <span className="created">{formattedDate}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy" onClick={() => onDelete(task.id)}></button>
            </div>
            {task.editing && (
                <input
                    type="text"
                    className="edit"
                    defaultValue={task.description}
                    onBlur={(e) => onEdit(task.id, e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onEdit(task.id, e.target.value)
                        }
                    }}
                />
            )}
        </li>
    )
}

export default Task
