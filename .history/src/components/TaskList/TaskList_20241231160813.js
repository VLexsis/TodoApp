import React from 'react'
import Task from '../Task/Task'

const TaskList = ({ tasks, onDeleted, onToggleDone, onEdit, onToggleEdit }) => {
    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggleDone={onToggleDone}
                    onDelete={onDeleted}
                    onEdit={onEdit}
                    onToggleEdit={onToggleEdit}
                />
            ))}
        </ul>
    )
}

TaskList.defaultProps = {
    tasks: [],
    onDeleted: () => {},
    onToggleDone: () => {},
    onEdit: () => {},
    onToggleEdit: () => {},
}

TaskList.PropTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    task: PropTypes.arrayOf(PropTypes.object),
}

export default TaskList
