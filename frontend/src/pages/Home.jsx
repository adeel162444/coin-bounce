import React, { useEffect } from "react";
import NavBar from "../components/Navbar/NavBar";
import LatestNews from "../components/LatestNews";
import { useDispatch } from "react-redux";
import { resetLoggedInUser } from "../store/slices/userSlice";

const Home = () => {
  return (
    <>
      <LatestNews />
    </>
  );
};

export default Home;
