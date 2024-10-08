import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use("/", (req, res) => {
  res.send("The server has been start now on the http//:localhost:4000");
});
app.listen(port, () => {
  console.log(`The server is start on the port ${port}`);
});
