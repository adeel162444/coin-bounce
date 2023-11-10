import React, { useEffect } from "react";
import NavBar from "../components/Navbar/NavBar";
import CoinTable from "../components/CoinTable";
import { useDispatch } from "react-redux";
import { resetLoggedInUser } from "../store/slices/userSlice";

const Crypto = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("came in crypto");

    return () => {
      console.log("getting out of crypto");
    };
  }, []);

  return (
    <>
      <CoinTable />
    </>
  );
};

export default Crypto;
