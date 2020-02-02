import React from 'react'
import Board from "react-trello"
const TaskBoard = (props) => {
    return (<Board style={{ backgroundColor: '#0F4C81' }} data={{lanes: props.tasks}} draggable collapsibleLanes editable canAddLanes editLaneTitle />
    )
};

export default TaskBoard;