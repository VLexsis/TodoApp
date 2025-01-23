import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

const TaskList = ({
    tasks = [],
    onDeleted = () => {},
    onToggleDone = () => {},
    onEdit = () => {},
    onToggleEdit = () => {},
    onPauseTimer = () => {},
    onPlayTimer = () => {},
    activeTaskId = null,
}) => {
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
                    onPlayTimer={onPlayTimer}
                    isActive={task.id === activeTaskId}
                />
            ))}
        </ul>
    )
}

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleEdit: PropTypes.func,
    onPauseTimer: PropTypes.func,
    onPlayTimer: PropTypes.func,
    activeTaskId: PropTypes.number,
}

export default TaskList
