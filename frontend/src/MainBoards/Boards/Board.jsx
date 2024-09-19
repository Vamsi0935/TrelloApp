import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import "./board.css";

function Board({
  board,
  addCard,
  removeBoard,
  removeCardLocally,
  onDragEnd,
  onDragEnter,
  updateCardLocally,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Remove Board
  const handleRemoveBoard = () => {
    removeBoard(board._id);
    console.log("Board removed:", board._id);
  };

  // Add Card to Board
  const handleAddCard = (title) => {
    if (!board?._id) {
      console.error("Board ID is missing!");
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      title,
      labels: [],
      date: "",
      tasks: [],
      desc: "",
    };

    addCard(board._id, title);
    console.log("Card added:", newCard);
  };

  // Remove Card from Board
  const handleRemoveCard = (cardId) => {
    removeCardLocally(board.id, cardId);
    console.log("Card removed:", cardId);
  };

  // Update Card on Board
  const handleUpdateCard = (cardId, updatedCard) => {
    updateCardLocally(board._id, cardId, updatedCard);
    console.log("Card updated:", cardId, updatedCard);
  };

  return (
    <div className="board">
      <div className="board-inner">
        <div className="board-header">
          <p className="board-header-title">
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
          <div
            className="board-header-title-more"
            onClick={() => setShowDropdown(true)}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={handleRemoveBoard}>Delete Board</p>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCardLocally={removeCardLocally}
              updateCardLocally={updateCardLocally}
              onDragEnd={onDragEnd}
              updateCard={handleUpdateCard}
            />
          ))}

          <CustomInput
            text="+ Add Card"
            placeholder="Enter Card Title"
            displayClass="board-add-card"
            editClass="board-add-card-edit"
            onSubmit={handleAddCard}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
