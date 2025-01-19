import React, { useState, useEffect } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
const Header = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/todo/all");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(`Can't be fetch todos ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div>
      <div className="haeder bg-white text-2xl p-2 flex justify-between">
        <div className="logo">Logo</div>
        <div className="menus flex">
          <nav>
            <ul className="flex gap-4">
              <Link to="/Create">Create</Link>
              <Link to="/Cards">Cards</Link>
              <Link to="/users">users</Link>
            </ul>
          </nav>
        </div>
        <div className="icon flex mr-4">
          <div className="cart">
            <TiShoppingCart className="size-8" />
          </div>
          <div className="total -mt-1 text-white bg-red-600 rounded-full h-8 w-8 text-center">
            {todos.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
