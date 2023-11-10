import { useEffect, useState } from "react";
import "./App.css";
import Login from "./forms/Login";
import NavBar from "./components/Navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Protected from "./components/protected/Protected";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import SignUp from "./forms/SignUp";
import { useSelector } from "react-redux";
import LoginProtected from "./components/protected/loginProtected";
import LoginPage from "./pages/LoginPage";
import Test1 from "./components/Test1";
import Crypto from "./pages/Crypto";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import SignUpPage from "./pages/SignUpPage";
import SubmitBlog from "./pages/SubmitBlog";
import BlogDetails from "./pages/BlogDetails";
import BlogUpdate from "./forms/BlogUpdate";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/crypto"
          element={
            <Protected>
              <Crypto />
            </Protected>
          }
        />
        <Route
          path="/blogs"
          element={
            <Protected>
              <Blogs />
            </Protected>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Protected>
              <BlogDetails />
            </Protected>
          }
        />
        <Route
          path="/blog-update/:id"
          element={
            <Protected>
              <BlogUpdate />
            </Protected>
          }
        />
        <Route
          path="/sblog"
          element={
            <Protected>
              <SubmitBlog />
            </Protected>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProtected>
              <LoginPage />
            </LoginProtected>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginProtected>
              <SignUp />
            </LoginProtected>
          }
        />

        <Route
          path="/test2"
          element={
            <>
              <Test1>
                <Test2 />
              </Test1>
            </>
          }
        />
        <Route
          path="/test3"
          element={
            <>
              <Test1>
                <Test3 />
              </Test1>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
