/**
 * @typedef {Object} ILabel
 * @property {string} color - The color of the label.
 * @property {string} text - The text of the label.
 */

/**
 * @typedef {Object} ITask
 * @property {number} id - The ID of the task.
 * @property {boolean} completed - Whether the task is completed or not.
 * @property {string} text - The text of the task.
 */

/**
 * @typedef {Object} ICard
 * @property {number} id - The ID of the card.
 * @property {string} title - The title of the card.
 * @property {ILabel[]} labels - An array of labels for the card.
 * @property {string} date - The date associated with the card.
 * @property {ITask[]} tasks - An array of tasks associated with the card.
 * @property {string} [desc] - An optional description for the card.
 */

/**
 * @typedef {Object} IBoard
 * @property {number} id - The ID of the board.
 * @property {string} title - The title of the board.
 * @property {ICard[]} cards - An array of cards on the board.
 */

export {};
