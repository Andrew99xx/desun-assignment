import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Blog from "./components/Blog/Blog";
import React from "react";
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";

const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/article/:id',
      element: <Blog />,
    },
    {
        path: '/admin',
        element: <Admin setIsLoggedIn={localStorage.getItem("loggedIn")} />,
      },

    {
      path: '/user-acc',
      element: <Auth />,
    },
  ]);
  
  export default router;