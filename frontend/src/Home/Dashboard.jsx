import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios for API calls
import Swal from "sweetalert2";
import "./dashboard.css";
import CustomInput from "../MainBoards/CustomInput/CustomInput";
import Board from "../MainBoards/Boards/Board";

function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ boardId: 0, cardId: 0 });

  // Fetch boards from the API
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/boards/");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const addBoardHandler = async (name) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/boards/create",
        { title: name }
      );
      setBoards((prevBoards) => [...prevBoards, response.data]);
    } catch (error) {
      console.error("Error adding board:", error);
      Swal.fire("Error", "Failed to add board", "error");
    }
  };

  const removeBoard = async (boardId) => {
    try {
      await axios.delete(`http://localhost:5000/api/boards/delete/${boardId}`);
      setBoards((prevBoards) =>
        prevBoards.filter((item) => item._id !== boardId)
      );
    } catch (error) {
      console.error("Error removing board:", error);
      Swal.fire("Error", "Failed to delete board", "error");
    }
  };

  // Add card via API
  const addCardHandler = async (boardId, title) => {
    try {
      const newCard = {
        title,
        labels: [],
        date: "",
        tasks: [],
        desc: "",
      };
      const response = await axios.post(
        `http://localhost:5000/api/cards/add/${boardId}`,
        newCard
      );
      setBoards((prevBoards) =>
        prevBoards.map((b) =>
          b._id === boardId ? { ...b, cards: [...b.cards, response.data] } : b
        )
      );
    } catch (error) {
      console.error("Error adding card:", error);
      Swal.fire("Error", "Failed to add card", "error");
    }
  };

  // Remove card via API
  const removeCard = async (boardId, cardId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cards/remove/${boardId}/${cardId}`
      );
      setBoards((prevBoards) =>
        prevBoards.map((b) =>
          b._id === boardId
            ? { ...b, cards: b.cards.filter((card) => card.id !== cardId) }
            : b
        )
      );
    } catch (error) {
      console.error("Error removing card:", error);
      Swal.fire("Error", "Failed to remove card", "error");
    }
  };

  // Update card via API
  const updateCard = async (boardId, cardId, updatedCard) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/update/${boardId}/${cardId}`,
        updatedCard
      );
      setBoards((prevBoards) =>
        prevBoards.map((b) =>
          b._id === boardId
            ? {
                ...b,
                cards: b.cards.map((c) =>
                  c.id === cardId ? response.data : c
                ),
              }
            : b
        )
      );
    } catch (error) {
      console.error("Error updating card:", error);
      Swal.fire("Error", "Failed to update card", "error");
    }
  };

  const onDragEnd = (sourceBoardId, sourceCardId) => {
    if (!targetCard.cardId) return;

    const sourceBoardIndex = boards.findIndex(
      (item) => item._id === sourceBoardId
    );
    const targetBoardIndex = boards.findIndex(
      (item) => item._id === targetCard.boardId
    );

    if (sourceBoardIndex < 0 || targetBoardIndex < 0) return;

    const sourceCardIndex = boards[sourceBoardIndex]?.cards.findIndex(
      (item) => item.id === sourceCardId
    );
    const targetCardIndexInTargetBoard = boards[
      targetBoardIndex
    ]?.cards.findIndex((item) => item.id === targetCard.cardId);

    if (sourceCardIndex < 0 || targetCardIndexInTargetBoard < 0) return;

    const sourceCard = boards[sourceBoardIndex].cards[sourceCardIndex];
    const tempBoardsList = [...boards];

    tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
    tempBoardsList[targetBoardIndex].cards.splice(
      targetCardIndexInTargetBoard,
      0,
      sourceCard
    );

    setBoards(tempBoardsList);

    updateCard(sourceBoardId, sourceCardId, sourceCard);
    updateCard(targetCard.boardId, targetCard.cardId, sourceCard);

    setTargetCard({ boardId: 0, cardId: 0 });
  };

  const onDragEnter = (boardId, cardId) => {
    if (targetCard.cardId === cardId) return;
    setTargetCard({ boardId, cardId });
  };

  return (
    <div className="app">
      <div className="app-nav"></div>
      <div className="app-boards-container">
        <div className="app-boards">
          {boards.map((item) => (
            <Board
              key={item._id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item._id)}
              removeCard={removeCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
              updateCard={updateCard}
            />
          ))}
          <div className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addBoardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
