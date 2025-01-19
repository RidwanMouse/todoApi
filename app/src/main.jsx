import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cards from "./Components/Cards.jsx";
import Create from "./Components/Create.jsx";
import Users from "./Components/Users.jsx"; // Renamed 'users' to 'Users' to match React conventions

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Cards",
        element: <Cards />,
      },
      {
        path: "/Create",
        element: <Create />,
      },
      {
        path: "/Users",
        element: <Users />, // Updated to use the correctly named Users component
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
