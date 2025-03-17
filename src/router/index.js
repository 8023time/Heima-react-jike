import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute/index";
import Layout from "@/pages/Layout/index"
import Login from "@/pages/Login/index";
import Home from "@/pages/Home/index";
import Article from "@/pages/Article/index";
import Publish from "@/pages/Publish/index";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRoute><Layout /></AuthRoute>, // 实现了路由鉴权
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;