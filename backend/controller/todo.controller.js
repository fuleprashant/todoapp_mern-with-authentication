import Todo from "../model/todo.model.js";

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

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json({ message: "Todo fetched succesfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occuring while creating Todo" });
  }
};
