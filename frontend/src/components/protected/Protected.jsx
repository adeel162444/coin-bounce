import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import {
  getLoggedInUser,
  resetLoggedInUser,
} from "../../store/slices/userSlice";
import NavBar from "../Navbar/NavBar";
export const loggedInUserDetails = async (dispatch) => {
  try {
    const serverPath = import.meta.env.VITE_SERVER_BASE_PATH;
    const response = await axios.get(`${serverPath}/api/user/loggedInUser`, {
      withCredentials: true,
    });
    console.log("data", response.data);

    console.log("after set auth");

    dispatch(getLoggedInUser(response.data));
    console.log("after dispatch");
    return response;
  } catch (error) {
    console.error(error);

    dispatch(resetLoggedInUser({}));
    return error;
  }
};
const Protected = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    loggedInUserDetails(dispatch);
    console.log("came in protected mount");
    return () => {
      console.log("going out of protected mount");
      dispatch(resetLoggedInUser(null));
    };
  }, []);
  const user = useSelector((state) => {
    return state.user;
  });
  console.log("user in state", user);

  if (user) {
    if (user.success) {
      return (
        <>
          {" "}
          <NavBar /> {children}
        </>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
};

export default Protected;
