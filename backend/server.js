// Package import
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

// Import Routers
const userRoutes = require("./routes/userRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const expensesRoutes = require("./routes/expensesRoutes");
const groceryRoutes = require("./routes/groceryRoutes");
const reportRoutes = require("./routes/reportRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Import Middlewared For Errorhandler and API URL Mismatch Founc
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express(); // main thing - Call express js
app.use(express.json()); // to accept json data
app.use("/", userRoutes); // Use user routes for api call
app.use("/", salaryRoutes); // Use salary routes for api call
app.use("/", expensesRoutes); // Use expenses routes for api call
app.use("/", groceryRoutes); // Use grocery routes for api call
app.use("/", reportRoutes); // Use report routes for api call
app.use("/", feedbackRoutes); // Use feedback routes for api call

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server started here
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
