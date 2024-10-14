import mongoose, { Schema } from "mongoose";

const userSchemas = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user", // refering the user model to connect to users collection in MongoDB
    required:true
  }
});

const Todo = mongoose.model("Todo", userSchemas);
export default Todo;
