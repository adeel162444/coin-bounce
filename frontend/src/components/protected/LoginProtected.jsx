import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { loggedInUserDetails } from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar/NavBar";
import { resetLoggedInUser } from "../../store/slices/userSlice";

const LoginProtected = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loggedInUserDetails(dispatch);
    console.log("came in loginProtected mount");
    return () => {
      console.log("going out of login protected");
      dispatch(resetLoggedInUser(null));
    };
  }, []);
  const user = useSelector((state) => {
    return state.user;
  });

  if (user) {
    if (user.success) {
      return <Navigate to="/" />;
    } else {
      return (
        <>
          {" "}
          <NavBar /> {children}
        </>
      );
    }
  } else return <></>;
};

export default LoginProtected;
