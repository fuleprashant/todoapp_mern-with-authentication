import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todo, setTodo] = useState([]);
  // console.log(todo);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

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
      // console.log("the response is created", responce);
      setTodo([...todo, responce.data.newTodo]);
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
        `http://localhost:4000/todo/updatetodo/${id}`,
        {
          text: todoupdate.text,
          completed: !todoupdate.completed,
        },
        {
          withCredentials: true,
        }
      );

      setTodo(todo.map((t) => (t._id === id ? response.data.todo : t)));
      console.log("Updated Todo:", response.data.todo);
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update the todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
      });

      setTodo(todo.filter((t) => t._id !== id)); // Filter out the deleted todo
    } catch (error) {
      setError("Failed to delete the todo ");
    }
  };

  const Logout = async () => {
    try {
      const responce = await axios.get("http://localhost:4000/user/logout");
      // console.log(responce.data.message);
      toast.success(responce.data.message);
      // remove the token from the localstorage and session.. too to remove that user
      navigate("/");
    } catch (error) {
      setError("Failed to logout the todo ");
      toast.error;
    }
  };

  const remainingTodos = todo.filter((tod) => !tod.completed).length;
  return (
    <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg mx-auto mt-11">
      <h1 className="text-2xl font-semibold text-center mb-2 p-3">Todo app</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          className="flex-grow p-2 border rounded-r-md focus:outline-none ml-28"
          onChange={(e) => setNewTodo(e.target.value)}
          value={newTodo}
          onKeyPress={(e) => e.key === "Enter" && todocreate()}
        />
        <button
          className="bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300"
          onClick={todocreate}
        >
          Add
        </button>
      </div>

      {loading ? (
        <div className="text-center justify-center">
          <span className="text-gray-500">Loading....</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      ) : (
        <ul className="space-y-2 m-10">
          {todo.map((tod, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={tod.completed}
                    onChange={() => updateTodo(tod._id)}
                  />
                  <span
                    className={`${
                      tod.completed
                        ? "line-through text-gray-800 font-semibold"
                        : ""
                    }`}
                  >
                    {tod.text}
                  </span>
                </div>
                <button
                  className="text-red-500 hover:text-red-800 duration-300"
                  onClick={() => deleteTodo(tod._id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-4 text-center  text-sm text-gray-700">
        {remainingTodos} todo remaining
      </p>
      <button
        className="mt-6 px-4 py-2 bg-red-500 text-white roundex-md hover:bg-red-800 duration-500 mx-auto block"
        onClick={Logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
