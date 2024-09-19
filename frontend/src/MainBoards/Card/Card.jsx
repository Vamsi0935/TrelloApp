import React, { useState } from "react";
import CardInfo from "./CardInfo/CardInfo";
import { formatDate } from "../../Helper/Util";
import Chip from "../Common/Chip";
import Dropdown from "../Dropdown/Dropdown";
import axios from "axios"; // Add Axios
import "./card.css";

function Card({
  card,
  boardId,
  removeCardLocally, // To update the UI after removing the card
  onDragEnd,
  onDragEnter,
  updateCardLocally,
  handleUpdateCard, // To update the UI after updating the card
}) {
  const { id: cardId, title, desc, date, tasks, labels } = card || {};

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Add logs to debug the values
  console.log("Card props:", { boardId, cardId, card });

  const handleDragEnd = () => {
    if (boardId && cardId) {
      onDragEnd(boardId, cardId);
    }
  };

  const handleDragEnter = () => {
    if (boardId && cardId) {
      onDragEnter(boardId, cardId);
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
      if (boardId && cardId) {
        // Log request details
        console.log(
          `Attempting to remove card: ${cardId} from board: ${boardId}`
        );

        // API call to remove the card
        const response = await axios.delete(
          `http://localhost:5000/api/cards/remove/${boardId}/${cardId}`
        );

        // Log response from the API
        console.log("Card removed successfully:", response.data);

        // Update the UI by removing the card
        removeCardLocally(boardId, cardId);
      } else {
        console.error("Missing boardId or cardId");
      }
    } catch (error) {
      console.error("Error removing card:", error);
      // Check for any specific error response from the server
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
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
        <div className="card-footer">
          {date && <p className="card-date">{formatDate(date)}</p>}
          {tasks?.length > 0 && (
            <p className="card-tasks">
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
