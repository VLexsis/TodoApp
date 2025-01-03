import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'

export default class App extends Component {
    maxId = 1

    createNewTask = (description) => {
        return {
            id: this.maxId++,
            description: description,
            created: Date.now(),
            completed: false,
        }
    }
    state = {
        tasks: [
            this.createNewTask('Completed task'),
            this.createNewTask('Editing task'),
            this.createNewTask('Active task'),
        ],
        filter: 'All',
    }

    deleteTask = (id) => {
        this.setState(({ tasks }) => {
            const idx = tasks.findIndex((el) => el.id === id)
            return { tasks: tasks.toSpliced(idx, 1) }
        })
    }

    onAddTask = (text) => {
        const newTask = this.createNewTask(text)

        this.setState(({ tasks }) => {
            const newArr = [...tasks, newTask]
            return {
                tasks: newArr,
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)
        const oldTask = arr[idx]
        const newItem = { ...oldTask, [propName]: !oldTask[propName] }
        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
    }

    onToggleDone = (id) => {
        this.setState(({ tasks }) => {
            return {
                tasks: this.toggleProperty(tasks, id, 'completed'),
            }
        })
    }

    filter(tasks, filter) {
        switch (filter) {
            case 'all':
                return tasks
            case 'active':
                return tasks.filter((task) => !task.completed)
            case 'completed':
                return tasks.filter((task) => task.completed)
            default:
                tasks
        }
    }

    render() {
        const { filter } = this.state
        const visibleTasks = this.filter()
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAddTask={this.onAddTask} />
                </header>
                <section className="main">
                    <TaskList tasks={this.state.tasks} onDeleted={this.deleteTask} onToggleDone={this.onToggleDone} />
                    <Footer tasks={this.state.tasks} />
                </section>
            </section>
        )
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'))

// Рендеринг приложения
root.render(<App />)
