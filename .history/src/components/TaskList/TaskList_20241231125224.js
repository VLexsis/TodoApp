import React from 'react'
import Task from '../Task/Task'

const TaskList = ({ tasks, onDeleted, onToggleDone }) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggle={onToggleDone}
                    onDelete={onDeleted}
                    onEdit={onEdit}
                    onToggleEdit={onToggleEdit}
                />
            ))}
        </ul>
    )
}

export default TaskList