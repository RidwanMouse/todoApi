import React, { useState } from "react";
import axios from "axios";

const Users = () => {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/new",
        userForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("User created:", response.data);
      setUserForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <>
      <div className="form bg-white p-16 m-auto mt-4 rounded-[20px] shadow-lg shadow-gray-200 w-[800px]">
        <form action="" onSubmit={handleSubmit}>
          <input
            value={userForm.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="username"
            className="w-full rounded-lg p-4 border-2 m-2"
            required
          />
          <br />
          <input
            value={userForm.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
            className="w-full rounded-lg p-4 border-2 m-2"
            required
          />
          <br />
          <input
            value={userForm.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            className="w-full p-4 border-2 rounded-lg m-2"
            required
          />{" "}
          <br />
          <button
            type="submit"
            className="bg-green-600 w-full p-4 mt-4 rounded-lg text-white text-2xl"
          >
            {" "}
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

export default Users;
