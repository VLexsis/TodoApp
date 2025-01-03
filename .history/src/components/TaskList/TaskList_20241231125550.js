import React from 'react'
import Task from '../Task/Task'

const TaskList = ({ tasks, onDeleted, onToggleDone, onEdit, onToggleEdit }) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggle={onToggleDone}
                    onDelete={onDeleted}
                    onEdit={onEdit} // Передаем onEdit
                    onToggleEdit={onToggleEdit}
                />
            ))}
        </ul>
    )
}

export default TaskList