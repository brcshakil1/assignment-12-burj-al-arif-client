import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Apartments from "../pages/Apartments/Apartments";
import Login from "../pages/Login/Login";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/apartment",
        element: <Apartments />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default Routers;
