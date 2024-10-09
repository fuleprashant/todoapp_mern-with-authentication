import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

const Home = () => {
  const [todo, setTodo] = useState([]);
  console.log(todo);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const responce = await axios.get("http://localhost:4000/todo/gettodo", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTodo(responce.data.todos);
    } catch (error) {
      console.log(error);
      setError("Failed to fetch the data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todocreate = async () => {
    if (!newTodo) return;

    try {
      const responce = await axios.post(
        "http://localhost:4000/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      setTodo([...todo, responce.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
      setError("Failed to create a todo");
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id) => {
    const todoupdate = todo.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4000/todo/update/${id}`,
        {
          ...todoupdate,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodo(todo.map((t) => (t._id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to update the todo completed");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/update/${id}`, {
        withCredentials: true,
      });
      setTodo(
        todo,
        filter((t) => t._id !== id)
      );
    } catch (error) {
      setError("Failed to delete the todo ");
    }
  };
  return (
    <div>
  


    </div>
  );
};

export default Home;
