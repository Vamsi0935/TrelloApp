const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");

// Get all boards
router.get("/", boardController.getAllBoards);

// Create a new board
router.post("/create", boardController.createBoard);

// Update a board
router.put("/:id", boardController.updateBoard);

// Delete a board
router.delete("/delete/:id", boardController.deleteBoard);

module.exports = router;
