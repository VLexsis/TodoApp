import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

const App = () => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')

    const createNewTask = (description, minutes, seconds) => {
        return {
            id: Date.now(),
            description,
            minutes: minutes || '00',
            seconds: seconds || '00',
            created: new Date(),
            completed: false,
            editing: false,
        }
    }

    const onAddTask = (text, minutes, seconds) => {
        const newTask = createNewTask(text, minutes, seconds)
        setTasks((prevTasks) => [...prevTasks, newTask])
    }

    const deleteTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const toggleProperty = (arr, id, propName) => {
        return arr.map((task) => (task.id === id ? { ...task, [propName]: !task[propName] } : task))
    }

    const onToggleDone = (id) => {
        setTasks((prevTasks) => toggleProperty(prevTasks, id, 'completed'))
    }

    const handleToggleEdit = (id) => {
        setTasks((prevTasks) => toggleProperty(prevTasks, id, 'editing'))
    }

    const onEdit = (id, newDescription) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task))
        )
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    const updateTaskTime = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.completed) return task

                let minutes = parseInt(task.minutes, 10)
                let seconds = parseInt(task.seconds, 10)

                if (seconds > 0) {
                    seconds -= 1
                } else if (minutes > 0) {
                    minutes -= 1
                    seconds = 59
                }

                return {
                    ...task,
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0'),
                }
            })
        )
    }

    useEffect(() => {
        const timerId = setInterval(updateTaskTime, 1000)
        return () => clearInterval(timerId)
    }, [updateTaskTime])

    const filterTasks = (tasks, filter) => {
        switch (filter) {
            case 'all':
                return tasks
            case 'active':
                return tasks.filter((task) => !task.completed)
            case 'completed':
                return tasks.filter((task) => task.completed)
            default:
                return tasks
        }
    }

    const visibleTasks = filterTasks(tasks, filter)

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <NewTaskForm onAddTask={onAddTask} />
            </header>
            <section className="main">
                <TaskList
                    tasks={visibleTasks}
                    onDeleted={deleteTask}
                    onToggleDone={onToggleDone}
                    onToggleEdit={handleToggleEdit}
                    onEdit={onEdit}
                />
                <Footer tasks={tasks} filter={filter} onFilterChange={setFilter} deleteAllTasks={deleteAllTasks} />
            </section>
        </section>
    )
}

App.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            minutes: PropTypes.string.isRequired,
            seconds: PropTypes.string.isRequired,
            created: PropTypes.instanceOf(Date).isRequired,
            completed: PropTypes.bool.isRequired,
            editing: PropTypes.bool.isRequired,
        })
    ),
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
}

App.defaultProps = {
    tasks: [],
    filter: 'all',
}

export default App
