import Todo from "../model/todo.model.js";

// This is the create todo
export const createTodo = async (req, res) => {
  const { text, completed } = req.body;

  const todo = new Todo({
    text,
    completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: "Error occurred while creating Todo" });
  }
};

// this is the function where we get all todos

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Todo fetched succesfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring while get all  Todo" });
  }
};

// this is the update fucntion
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    console.log(text);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring while updating Todo" });
  }
};

// this is the delete function
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred while deleting Todo" });
  }
};
