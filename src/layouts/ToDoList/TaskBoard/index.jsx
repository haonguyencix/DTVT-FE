import React from "react";
import Board from "react-trello";

const TaskBoard = props => {
  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    props.changeCard({ cardId, laneId: targetLaneId });
  };

  const onLaneAdd = lane => {
    props.addTask(lane);
  };

  const onLaneDelete = laneId => {
    props.deleteTask(laneId);
  };

  const onLaneUpdate = (laneId, data) => {
    const updateLane = { id: Number(laneId), ...data };
    props.updateTask(updateLane);
  };

  const onCardAdd = (card, laneId) => {
    const addCard = {
      cardId: card.id,
      title: card.title,
      label: card.label ? card.label : "",
      description: card.description,
      laneId
    };
    props.addCard(addCard);
  };

  const onCardDelete = (cardId, laneId) => {
    props.deleteCard(cardId);
  };

  return (
    <Board
      style={{ backgroundColor: "$primary-classic-blue" }}
      data={{ lanes: props.tasks }}
      draggable
      collapsibleLanes
      editable
      canAddLanes
      editLaneTitle
      handleDragEnd={handleDragEnd}
      onLaneAdd={onLaneAdd}
      onLaneDelete={onLaneDelete}
      onLaneUpdate={onLaneUpdate}
      onCardAdd={onCardAdd}
      onCardDelete={onCardDelete}
    />
  );
};

export default TaskBoard;
