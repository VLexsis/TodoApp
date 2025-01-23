import React, { useState, useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'
import './index.css'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

const App = () => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter] = useState('all')
    const [timerId, setTimerId] = useState(null)
    const maxId = useRef(1)

    const createNewTask = (description, minutes, seconds) => {
        return {
            id: maxId.current++,
            description: description,
            minutes: minutes || '00',
            seconds: seconds || '00',
            created: new Date(),
            completed: false,
            editing: false,
        }
    }

    // Объявляем stopTimer до startTimer
    const stopTimer = useCallback(() => {
        if (timerId) {
            clearInterval(timerId)
            setTimerId(null)
        }
    }, [timerId])

    const startTimer = useCallback(() => {
        stopTimer() // Теперь stopTimer доступна
        const id = setInterval(() => {
            updateTaskTime()
        }, 1000)
        setTimerId(id)
    }, [stopTimer, updateTaskTime])

    const onPauseTimer = useCallback(() => {
        stopTimer()
    }, [stopTimer])

    const onPlayTimer = useCallback(() => {
        if (!timerId) {
            startTimer()
        }
    }, [timerId, startTimer])

    const updateTaskTime = useCallback(() => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.completed) return task

                let minutes = parseInt(task.minutes, 10)
                let seconds = parseInt(task.seconds, 10)

                if (seconds > 0) {
                    seconds = seconds - 1
                } else if (minutes > 0) {
                    minutes = minutes - 1
                    seconds = 59
                }

                return {
                    ...task,
                    minutes: minutes.toString().padStart(2, '0'),
                    seconds: seconds.toString().padStart(2, '0'),
                }
            })
        )
    }, [])

    const deleteTask = useCallback((id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }, [])

    const onAddTask = useCallback((text, minutes, seconds) => {
        const newTask = createNewTask(text, minutes, seconds)
        setTasks((prevTasks) => [...prevTasks, newTask])
    }, [])

    const toggleProperty = useCallback((arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id)
        const oldTask = arr[idx]
        const newItem = { ...oldTask, [propName]: !oldTask[propName] }
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
    }, [])

    const onToggleDone = useCallback(
        (id) => {
            setTasks((prevTasks) => toggleProperty(prevTasks, id, 'completed'))
        },
        [toggleProperty]
    )

    const handleToggleEdit = useCallback(
        (taskId) => {
            setTasks((prevTasks) => toggleProperty(prevTasks, taskId, 'editing'))
        },
        [toggleProperty]
    )

    const onEdit = useCallback((id, newDescription) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === id ? { ...task, description: newDescription } : task))
        )
    }, [])

    const deleteAllTasks = useCallback(() => {
        setTasks([])
    }, [])

    const filterTasks = useCallback((tasks, filter) => {
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
    }, [])

    const onFilterChange = useCallback((newFilter) => {
        setFilter(newFilter)
    }, [])

    useEffect(() => {
        startTimer()
        return () => {
            stopTimer()
        }
    }, [startTimer, stopTimer])

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
                    onPauseTimer={onPauseTimer}
                    onPlayTimer={onPlayTimer}
                />
                <Footer tasks={tasks} filter={filter} onFilterChange={onFilterChange} deleteAllTasks={deleteAllTasks} />
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
