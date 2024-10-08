import mongoose, { mongo, Schema } from "mongoose";

const userSchemas = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model("Todo", userSchemas);
export default Todo;
