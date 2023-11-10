import React, { useEffect } from "react";
import NavBar from "../components/Navbar/NavBar";
import Login from "../forms/Login";
import { useDispatch } from "react-redux";
import { resetLoggedInUser } from "../store/slices/userSlice";

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
