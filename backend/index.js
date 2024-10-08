import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "./routes/todo.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("The database is connected"))
  .catch((err) => console.log("The error is occured", err));

app.use(express.json());
app.use("/todo", todoRoute);

app.use("/", (req, res) => {
  res.send("the server has been started");
});
app.listen(port, () => {
  console.log(`The server is start on the port http://localhost:${port}`);
});
