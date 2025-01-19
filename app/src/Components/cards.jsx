import React, { useState, useEffect } from "react";

const Cards = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [updateFields, setUpdateFields] = useState({
    title: "",
    description: "",
    isCompleted: " ", 
  });

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todo/all");
      const data = await response.json();
      const normalizedData = data.map((todo) => ({
        ...todo,
        isCompleted: Boolean(todo.isCompleted), // Normalize to boolean
      }));
      setTodos(normalizedData);
    } catch (error) {
      console.log(`Can't fetch todos: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/todo/delete/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((todo) => todo.tododId !== id));
    } catch (error) {
      console.log(`Failed to delete todo: ${error.message}`);
    }
  };

  const updateTodo = async () => {
    try {
      const { title, description, isCompleted } = updateFields;
      const response = await fetch(
        `http://localhost:8080/api/todo/update/${editingTodo.tododId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, isCompleted }),
        }
      );
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos((prev) =>
          prev.map((todo) =>
            todo.tododId === editingTodo.tododId
              ? { ...todo, ...updatedTodo }
              : todo
          )
        );
        setEditingTodo(null);
        setUpdateFields({ title: "", description: "", isCompleted: "" });
      }
    } catch (error) {
      console.log(`Failed to update todo: ${error.message}`);
    }
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo);
    setUpdateFields({
      title: todo.title || "",
      description: todo.description || "",
      isCompleted: Boolean(todo.isCompleted), // Ensure boolean type
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 flex-wrap">
        {todos.map((todo) => (
          <div
            key={todo.tododId}
            className="card bg-white w-[250px] p-4 m-4 rounded-lg"
          >
            <h1 className="font-semibold">Title: {todo.title}</h1>
            <p className="font-semibold">Description: {todo.description}</p>
            <span className="bg-gray-500 px-2 rounded-lg text-white">
              isCompleted: {String(todo.isCompleted)}
            </span>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditClick(todo)}
                className="bg-blue-500 text-white px-2 py-1 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(todo.tododId)}
                className="bg-red-500 text-white px-2 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingTodo && (
        <div className="mt-6">
          <h2 className="text-lg font-bold">Edit Todo</h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Title"
              value={updateFields.title}
              onChange={(e) =>
                setUpdateFields({ ...updateFields, title: e.target.value })
              }
              className="border border-gray-400 rounded p-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={updateFields.description}
              onChange={(e) =>
                setUpdateFields({
                  ...updateFields,
                  description: e.target.value,
                })
              }
              className="border border-gray-400 rounded p-2"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={updateFields.isCompleted}
                onChange={(e) =>
                  setUpdateFields({
                    ...updateFields,
                    isCompleted: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />
              Mark as Completed
            </label>
            <button
              onClick={updateTodo}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
