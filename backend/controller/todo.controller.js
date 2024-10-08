

import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const { text, completed } = req.body;
  console.log(text);
  console.log(completed);


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
