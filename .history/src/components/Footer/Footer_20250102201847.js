import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

export default class Footer extends Component {
    static propTypes = {
        tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
        filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
        onFilterChange: PropTypes.func.isRequired,
        deleteAllTasks: PropTypes.func.isRequired,
    }

    render() {
        const { tasks, filter, onFilterChange, deleteAllTasks } = this.props
        const itemsLeft = tasks.filter((task) => !task.completed).length

        return (
            <footer className="footer">
                <span className="todo-count">{itemsLeft} items left</span>
                <TasksFilter filter={filter} onFilterChange={onFilterChange} />
                <button className="clear-completed" onClick={deleteAllTasks}>
                    Clear completed
                </button>
            </footer>
        )
    }
}
