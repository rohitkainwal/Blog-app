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
import EditPost from "../pages/EditPost";
import Profile from "../pages/Profile";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AllPosts from "../pages/AllPosts";




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
    path: "/all-posts",
    element: <AllPosts/>
  },
 

   {
    path: "/edit/:id",
    element:(
<PrivateRoute>
  <EditPost/>
</PrivateRoute>
    )
    
  },

 

   {
    path: "/profile",
    element:<Profile/>
  }


]);
