import React from 'react';
import { TaskListHeader, TaskListContent } from '../../../../../components/TaskList';



const TaskListItem = props => {
    const { dataInTable } = props;

    return (
        <div>
            <TaskListHeader />
            {dataInTable.map((item, index) => {
                return (
                    <TaskListContent key={index + '-task'} index={index} item={item} />
                )
            })}
        </div>
    )
}

export default TaskListItem
