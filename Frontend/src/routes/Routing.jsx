import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import EmailVerify from "../pages/EmailVerify";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SinglePost from "../pages/SinglePost";
import CreatePost from "../pages/CreatePost";
import AboutBlog from "../pages/AboutBlog"
import ContactUs from "../pages/ContactUs";
import EditPost from "../pages/EditPost";
import Profile from "../pages/Profile";




export const myRoute = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  
  {
    path: "/email-verify/:token",
    element: <EmailVerify />,
  },
   {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
   {
    path: "/reset-password/:token",
    element: <ResetPassword/>
  },
    {
    path: "/SinglePost/:id",
    element: <SinglePost/>
  },
  {
    path: "/CreatePost",
    element: <CreatePost/>
  },
  {
    path: "/about",
    element:<AboutBlog/>
  },

   {
    path: "/edit-post",
    element:<EditPost/>
  },

  {
    path: "/contact",
    element:<ContactUs/>
  },

   {
    path: "/profile",
    element:<Profile/>
  }


]);
