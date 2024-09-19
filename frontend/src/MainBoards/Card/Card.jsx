import React, { useState } from "react";
import CardInfo from "./CardInfo/CardInfo";
import { formatDate } from "../../Helper/Util";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios";
import "./card.css";

function Card(props) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  const { _id: cardId, title, desc, date, tasks, labels } = card || {}; // Changed from `id` to `_id`
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDragEnd = () => {
    if (boardId && cardId) {
      onDragEnd(boardId, cardId);
    } else {
      console.error("Invalid boardId or cardId during drag end", {
        boardId,
        cardId,
      });
    }
  };

  const handleDragEnter = () => {
    if (boardId && cardId) {
      onDragEnter(boardId, cardId);
    } else {
      console.error("Invalid boardId or cardId during drag enter", {
        boardId,
        cardId,
      });
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // Remove card functionality
  const handleRemoveCard = async () => {
    try {
      if (!boardId || !cardId) {
        throw new Error("Invalid boardId or cardId");
      }
      console.log(`Removing card with boardId: ${boardId}, cardId: ${cardId}`);
      await axios.delete(`http://localhost:5000/api/boards/delete/${boardId}`);
      console.log("Card removed successfully");
      removeCard(boardId, cardId); // Remove card from UI
    } catch (error) {
      console.error("Failed to delete card:", error.message);
    }
  };

  // Update card functionality
  const handleUpdateCard = async (updatedCard) => {
    try {
      if (!boardId || !cardId) {
        throw new Error("Invalid boardId or cardId");
      }
      console.log(`Updating card with boardId: ${boardId}, cardId: ${cardId}`);
      const response = await axios.put(
        `http://localhost:5000/api/boards/${boardId}`,
        updatedCard
      );
      console.log("Card updated successfully:", response.data);
      updateCard(boardId, cardId, response.data); // Update card in UI
    } catch (error) {
      console.error("Failed to update card:", error.message);
    }
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={handleUpdateCard}
        />
      )}
      <div
        className="card"
        key={cardId}
        draggable
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onClick={handleModalOpen}
      >
        <div className="card-top">
          <div className="card-top-labels">
            {labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div>
          <div className="card-top-more" onClick={handleDropdownClick}>
            &#x22EE;
            {showDropdown && (
              <Dropdown
                className="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={handleRemoveCard}>Delete Card</p>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card-title">{title}</div>
        <div>
          <p title={desc}>✎</p>
        </div>
        <div className="card-footer">
          {date && <p className="card-footer-item">⏰ {formatDate(date)}</p>}
          {tasks && tasks.length > 0 && (
            <p className="card-footer-item">
              ✅ {tasks.filter((item) => item.completed).length}/{tasks.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
