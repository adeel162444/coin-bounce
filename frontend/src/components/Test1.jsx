import React, { useEffect, useState } from "react";
import { loggedInUserDetails } from "./protected/Protected";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Test1 = ({ children }) => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("outside test");
  useEffect(() => {
    console.log("test1 mount function");
    return () => {
      console.log("test1 unmounts");
    };
  }, []);
  return children;
};

export default Test1;
