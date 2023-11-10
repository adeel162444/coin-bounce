import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Test2 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("test2 mounts");
    return () => {
      console.log("test2 unmounts");
    };
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/test3")}> to test3</button>
    </div>
  );
};

export default Test2;
