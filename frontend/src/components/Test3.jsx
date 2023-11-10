import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Test3 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("test3 mounts");
    return () => {
      console.log("test3 unmounts");
    };
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/test2")}> to test2</button>
    </div>
  );
};

export default Test3;
