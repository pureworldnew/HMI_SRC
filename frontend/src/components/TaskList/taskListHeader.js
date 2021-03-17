import React from 'react';



const TaskListHeader = () => {

    return (
        <div className="taskls taskls-header">
            <div className="taskls-item t-state">
            </div>
            <div className="taskls-item t-name">
                Task Name
            </div>
            <div className="taskls-item t-company">
                Company
            </div>
            <div className="taskls-item t-timeremain">
                Time remaining
            </div>
            <div className="taskls-item t-assignees">
                Assignees
            </div>
            <div className="taskls-item t-comments">
                Comments
            </div>
            <div className="taskls-item t-status">
                Status
            </div>
            <div className="taskls-item t-option">
                Options
            </div>
        </div>
    );
}
export default TaskListHeader;
