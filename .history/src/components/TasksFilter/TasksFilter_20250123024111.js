import React, { Component } from 'react'
import PropTypes from 'prop-types'

const TasksFilter = (props) => {
const {filter = 'all', onFilterChange = () => {} } = props;

   const buttons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'completed', label: 'Completed' },
   ]

return (
    <ul className="filters">
         {buttons.map(({ name, label }) => {
                const isActive = filter === name;
                const className = isActive ? 'selected' : '';
                return (
                    <li key={name}>
                        <button className={className} onClick={() => onFilterChange(name)}>
                            {label}
                        </button>
                    </li>
                );
            })}
    </ul>
)

}

TasksFilter.propTypes = {
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    onFilterChange: PropTypes.func.isRequired,
}
