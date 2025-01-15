import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({ tasks, onDeleted, onToggleDone, onEdit, onToggleEdit, onPauseTimer }) => {
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
                    onPauseTimer={onPauseTimer}
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

TaskList.propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    tasks: PropTypes.arrayOf(PropTypes.object),
}

export default TaskList
