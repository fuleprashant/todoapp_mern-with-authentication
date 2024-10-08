import Todo from "../model/todo.model";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created succesfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error ocuuring in todo creation" });
  }
};
