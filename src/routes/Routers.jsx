import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
]);

export default Routers;
