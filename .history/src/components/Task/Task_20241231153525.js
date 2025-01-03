import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ task, onDelete, onEdit, onToggleEdit, onToggleDone }) => {
    const formattedDate = formatDistanceToNow(task.created, { addSuffix: true })

    const handleEdit = (e) => {
        if (e.key === 'Enter' || e.type === 'blur') {
            onEdit(task.id, e.target.value)
            onToggleEdit(task.id)
        }
    }

    return (
        <li className={task.completed ? 'completed' : task.editing ? 'editing' : ''}>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleDone(task.id)}
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

Task.defaultProps = {
    task: {
        id: 0,
        description: '',
        created: new Date(),
        completed: false,
        editing: false,
    },
    onDelete: () => {},
    onEdit: () => {},
    onToggleEdit: () => {},
    onToggleDone: () => {},
}
export default Task