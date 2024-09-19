import React, { useEffect, useState } from "react";
import { Type, Tag } from "react-feather";
import { colorsList } from "../../../Helper/Util";
import Modal from "../../Modal/Modal";
import CustomInput from "../../CustomInput/CustomInput";
import "./cardInfo.css";
import Chip from "../../Common/Chip";
import axios from "axios"; // Import axios

function CardInfo(props) {
  const { onClose, card, boardId, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState({ ...card });

  // Validate boardId and cardValues.id
  if (!boardId || !cardValues.id) {
    console.error("Board ID or Card ID is missing");
    return null;
  }

  // Update the card title
  const updateTitle = async (value) => {
    const updatedCard = { ...cardValues, title: value };
    setCardValues(updatedCard);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/update/${boardId}/${cardValues.id}`,
        updatedCard
      );
      console.log("Card updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating card title:",
        error.response?.data || error.message
      );
    }
  };

  // Add a label with the selected color
  const addLabel = async (color) => {
    if (cardValues.labels.find((label) => label.color === color)) return;

    const newLabel = { text: `Label ${Date.now()}`, color };
    const updatedCard = {
      ...cardValues,
      labels: [...cardValues.labels, newLabel],
    };
    setCardValues(updatedCard);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/update/${boardId}/${cardValues.id}`,
        updatedCard
      );
      console.log("Card updated with new label:", response.data);
    } catch (error) {
      console.error(
        "Error adding label:",
        error.response?.data || error.message
      );
    }
    setSelectedColor("");
  };

  // Remove a label by its color
  const removeLabel = async (color) => {
    const updatedLabels = cardValues.labels.filter(
      (label) => label.color !== color
    );
    const updatedCard = { ...cardValues, labels: updatedLabels };
    setCardValues(updatedCard);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/update/${boardId}/${cardValues.id}`,
        updatedCard
      );
      console.log("Card updated after label removal:", response.data);
    } catch (error) {
      console.error(
        "Error removing label:",
        error.response?.data || error.message
      );
    }
  };

  // useEffect(() => {
  //   if (updateCard) updateCard(boardId, cardValues.id, cardValues);
  // }, [cardValues, boardId, updateCard]);

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        {/* Title Section */}
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Type />
            <p>Title</p>
          </div>
          <CustomInput
            defaultValue={cardValues.title}
            text={cardValues.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        {/* Label Color Section */}
        <div className="cardinfo-box">
          <div className="cardinfo-box-title">
            <Tag />
            <p>Labels</p>
          </div>
          <div className="cardinfo-box-colors">
            {colorsList.map((color, index) => (
              <div
                key={index}
                className="cardinfo-box-color"
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && <span>✔</span>}
              </div>
            ))}
          </div>
          <div className="cardinfo-box-labels">
            {cardValues.labels.map((label, index) => (
              <Chip
                key={index}
                item={label}
                onRemove={() => removeLabel(label.color)}
              />
            ))}
          </div>
          {selectedColor && (
            <button
              className="cardinfo-add-label"
              onClick={() => addLabel(selectedColor)}
            >
              Add Label
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
