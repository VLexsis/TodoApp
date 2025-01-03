import React, { Component } from 'react'
import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ tasks, filter }) => {
    const completedCount = tasks.filter((el) => el.completed).length
    const todoCount = tasks.length - completedCount
}
