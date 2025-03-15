import { createBrowserRouter } from "react-router-dom";
import Layout from "@/pages/Layout/index"
import Login from "@/pages/Login/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;