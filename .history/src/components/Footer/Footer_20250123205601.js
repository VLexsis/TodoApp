import React from 'react'
import PropTypes from 'prop-types'

const Footer = ({ tasks = [], filter = 'all', onFilterChange = () => {}, deleteAllTasks = () => {} }) => {
    const buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' },
    ]

    return (
        <footer className="footer">
            <span className="todo-count">{tasks.filter((task) => !task.completed).length} items left</span>
            <ul className="filters">
                {buttons.map(({ name, label }) => {
                    const isActive = filter === name
                    const className = isActive ? 'selected' : ''
                    return (
                        <li key={name}>
                            <button className={className} onClick={() => onFilterChange(name)}>
                                {label}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <button className="clear-completed" onClick={deleteAllTasks}>
                Clear completed
            </button>
        </footer>
    )
}

Footer.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
    onFilterChange: PropTypes.func,
    deleteAllTasks: PropTypes.func,
}

export default Footer
