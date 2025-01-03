import { formatDistanceToNow } from 'date-fns'

import React, { Component } from 'react'

export default class Task extends Component {
    render() {
        const { task, onDeleted, onToggleDone } = this.props

        const classNames = task.completed ? 'completed' : ''

        return (
            <li className={classNames}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={task.completed} />
                    <label>
                        <span className="description" onClick={onToggleDone}>
                            {task.description}
                        </span>
                        <span className="created">{task.created}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy" onClick={onDeleted}></button>
                </div>
                {task.editing && <input type="text" className="edit" value={task.description} readOnly />}
            </li>
        )
    }
}

//onTaskClick = () => {
//this.setState((prevState) => ({
// completed: !prevState.completed,
//}));
//};
