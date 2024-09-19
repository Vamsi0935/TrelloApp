import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import Swal from "sweetalert2";
import "./board.css";

function Board(props) {
  const { board, setBoard, onDragEnd, onDragEnter } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  // Confirm and Remove Board
  const confirmRemoveBoard = async (boardId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the board and all associated cards.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/boards/delete/${boardId}`);
        Swal.fire("Deleted!", "Your board has been deleted.", "success");
        setBoard((prevBoard) => (prevBoard._id === boardId ? null : prevBoard));
      }
    } catch (error) {
      console.error("Failed to delete board:", error.message);
      Swal.fire("Error!", "Failed to delete the board.", "error");
    }
  };

  // Add Card to Board
  const handleAddCard = async (title) => {
    if (!board?._id) {
      console.error("Board ID is missing!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/cards/create`, // Ensure the correct route for adding cards
        { title, boardId: board._id } // Send both title and board ID
      );
      const newCard = response.data;
      setBoard((prevBoard) => ({
        ...prevBoard,
        cards: [...prevBoard.cards, newCard],
      }));
      Swal.fire("Success!", "Card added successfully.", "success");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Board or card route not found.");
      } else {
        console.error("Failed to add card:", error.message);
      }
      Swal.fire("Error!", "Failed to add the card.", "error");
    }
  };

  // Remove Card from Board
  const handleRemoveCard = async (cardId) => {
    if (!board?._id) return;
    try {
      await axios.delete(`http://localhost:5000/api/cards/delete/${cardId}`);
      setBoard((prevBoard) => ({
        ...prevBoard,
        cards: prevBoard.cards.filter((card) => card._id !== cardId),
      }));
      Swal.fire("Success!", "Card removed successfully.", "success");
    } catch (error) {
      console.error("Failed to remove card:", error.message);
      Swal.fire("Error!", "Failed to remove the card.", "error");
    }
  };

  // Update Card on Board
  const handleUpdateCard = async (cardId, updatedCard) => {
    if (!board?._id) return;
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/update/${cardId}`,
        updatedCard
      );
      const updatedCardData = response.data;
      setBoard((prevBoard) => ({
        ...prevBoard,
        cards: prevBoard.cards.map((card) =>
          card._id === cardId ? updatedCardData : card
        ),
      }));
      Swal.fire("Success!", "Card updated successfully.", "success");
    } catch (error) {
      console.error("Failed to update card:", error.message);
      Swal.fire("Error!", "Failed to update the card.", "error");
    }
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
                <p onClick={() => confirmRemoveBoard(board?._id)}>
                  Delete Board
                </p>
              </Dropdown>
            )}
          </div>
        </div>

        <div className="board-cards custom-scroll">
          {board?.cards?.map((item) => (
            <Card
              key={item._id}
              card={item}
              boardId={board._id}
              removeCard={handleRemoveCard}
              onDragEnter={onDragEnter}
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
