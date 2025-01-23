import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

const Task = ({ task, onDelete, onEdit, onToggleEdit, onToggleDone, onPauseTimer, onPlayTimer, isActive  }) => {
    const formattedDate = formatDistanceToNow(task.created, {
        addSuffix: true,
        includeSeconds: true,
    })

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
                    <span className="title" onClick={() => onToggleDone(task.id)}>
                        {task.description}
                    </span>
                    <span className="description">
                        <button className="icon icon-play" onClick={() => onPlayTimer(task.id)}></button>
                        <button className="icon icon-pause" onClick={() => onPauseTimer(task.id)}></button>
                        {task.minutes}:{task.seconds}
                    </span>
                    <span className="description">{formattedDate}</span>
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

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        created: PropTypes.instanceOf(Date).isRequired,
        completed: PropTypes.bool.isRequired,
        editing: PropTypes.bool.isRequired,
    }).isRequired,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
}
export default Task
