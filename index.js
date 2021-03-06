import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

const app = express();
dotenv.config();

// mongodb connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};
// check mongodb disconnection
mongoose.connection.on("disconnected", () => {
  console.log("mongobd disconnected");
});
// check mongodb connection
mongoose.connection.on("connected", () => {
  console.log("mongobd is connected");
});
// middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
// hotel route
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: err.stack,
  });
});
// node server
app.listen(8080, () => {
  connect();
  console.log("connected to backend");
});
