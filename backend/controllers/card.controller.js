const Board = require("../models/board.model");

// Add a new card to a board
const addCard = async (req, res) => {
  const { boardId } = req.params;
  const { title, labels, date, tasks, desc } = req.body;

  try {
    // Find the board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Create new card
    const newCard = {
      id: new Date().toISOString(), // Use a string for unique IDs
      title,
      labels,
      date,
      tasks,
      desc,
    };

    // Add card to board and save
    board.cards.push(newCard);
    await board.save();

    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a card from a board
const removeCard = async (req, res) => {
  const { boardId, cardId } = req.params;

  try {
    // Find the board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Remove card from board
    board.cards = board.cards.filter((card) => card.id !== cardId);
    await board.save();

    res.status(204).send();
  } catch (error) {
    console.error("Error removing card:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a card in a board
const updateCard = async (req, res) => {
  const { boardId, cardId } = req.params;
  const updatedCard = req.body;

  try {
    // Find the board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Find and update card
    const cardIndex = board.cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      return res.status(404).json({ message: "Card not found" });
    }

    board.cards[cardIndex] = { ...board.cards[cardIndex], ...updatedCard };
    await board.save();

    res.json(board.cards[cardIndex]);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all cards for a specific board
const getCards = async (req, res) => {
  const { boardId } = req.params;

  try {
    // Find the board
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board.cards);
  } catch (error) {
    console.error("Error getting cards:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addCard,
  removeCard,
  updateCard,
  getCards,
};
