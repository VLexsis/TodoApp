import React from 'react'
import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ tasks, filter, onFilterChange, deleteAllTasks }) => {
    const completedCount = tasks.filter((el) => el.completed).length
    const todoCount = tasks.length - completedCount

    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter filter={filter} onFilterChange={onFilterChange} />
            <button className="clear-completed" onClick={deleteAllTasks}>
                Clear completed
            </button>
        </footer>
    )
}

Footer.defaultProps = {
    tasks: [],
    filter: 'all',
    onFilterChange: () => {},
    deleteAllTasks: () => {},
}

Footer.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            created: PropTypes.instanceOf(Date).isRequired,
            completed: PropTypes.bool.isRequired,
            editing: PropTypes.bool.isRequired,
        })
    ).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    deleteAllTasks: PropTypes.func.isRequired,
}

export default Footer
