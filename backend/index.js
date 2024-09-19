const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// app.use(cors());
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:3000',
  'https://trello-app-frontend-mocha.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,PUT,POST,DELETE',
  credentials: true
}));

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:J3T2L1nSdlJIxl9F@cluster0.5s9n0.mongodb.net/TrelloApp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB connected.....");
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/user.route");
const boardRoutes = require("./routes/board.route");
const cardRoutes = require("./routes/card.route");
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000, () => {
  console.log(`Server is running.....`);
});
