import React, { useState } from "react";
import axios from "axios";
const Create = () => {
  const [todoForm, setTodoForm] = useState({
    title: "",
    description: "",
    isCompleted: "",
  });
  const handleChange = (e) => {
    setTodoForm({ ...todoForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/todo/new",
        todoForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTodoForm({
        title: "",
        description: "",
        isCompleted: "",
      });
    } catch (error) {
       console.error("Error creating user:", error);
    }
  };
  return (
    <>
      <div className="form bg-white p-16  m-auto mt-4 rounded-[20px] shadow-lg shadow-gray-200 w-[800px] ">
        <form action="" onSubmit={handleSubmit}>
          <input
            value={todoForm.title}
            onChange={handleChange}
            type="text"
            placeholder="title"
            name="title"
            className="w-full rounded-lg p-4 border-2 m-2"
          />
          <br />
          <textarea
            value={todoForm.description}
            onChange={handleChange}
            name="description"
            placeholder="description"
            className="w-full rounded-lg p-4 border-2 m-2"
            id=""
          ></textarea>{" "}
          <br />
          <input
            value={todoForm.isCompleted}
            onChange={handleChange}
            type="text"
            name="isCompleted"
            placeholder="isComplated"
            className="w-full p-4 border-2 rounded-lg m-2"
          />
          <br />
          <button
            type="submit"
            className="bg-green-600 w-full p-4 mt-4 rounded-lg text-white text-2xl"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
