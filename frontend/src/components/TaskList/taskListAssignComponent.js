import React from 'react';
import { Avatar } from '@material-ui/core';




const TaskListAssignComponent = (props) => {
    let [main, ...otherAssign] = props.assign;

    return (
        <>
            {main && <Avatar className="assign-icon assign-icon-main" style={{zIndex: props.assign.length}}></Avatar>}
            {
                otherAssign.length ?
                <div className="assign-container">
                    {
                        otherAssign.map((assign, index) => {
                            return index < 3 ? <Avatar
                                        key={index}
                                        className="assign-icon assign-icon-child"
                                        style={{left: `-${index*10}px`, zIndex: otherAssign.length-index}}
                                    >
                                    {index === 2 &&  `+${otherAssign.length-index}`}
                                    </Avatar> : null;
                        })
                    }
                </div> : null
            }
        </>
    );
}
export default TaskListAssignComponent;
