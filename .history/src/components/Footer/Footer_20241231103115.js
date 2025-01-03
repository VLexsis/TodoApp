import React, { Component } from 'react'
import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ tasks, filter }) => {
    const completedCount = tasks.filter((el) => el.completed).length
    const todoCount = tasks.length - completedCount

    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter />><button className="clear-completed">Clear completed</button>
        </footer>
    )
}
