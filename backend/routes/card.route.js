const express = require("express");
const router = express.Router();
const cardController = require("../controllers/card.controller");

// Routes for cards within boards
router.get("/:boardId", cardController.getCards);
router.post("/add/:boardId", cardController.addCard);
router.delete("/remove/:boardId/:cardId", cardController.removeCard);
router.put("/update/:boardId/:cardId", cardController.updateCard);

module.exports = router;
