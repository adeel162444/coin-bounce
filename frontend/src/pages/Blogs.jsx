import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/Navbar/NavBar";
import LoaderSpinner from "../components/loadSpinner/LoaderSpinner";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_PATH}/api/blog/all`,
        { withCredentials: true }
      );
      setBlogs(data.blogs);
      console.log("blogs data", data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      {blogs.length > 0 ? (
        <>
          {" "}
          <div> All blogs </div>{" "}
          <div className=" w-[90%] mx-auto flex justify-center gap-1 flex-wrap">
            {blogs.map((curElem, index) => {
              return (
                <div
                  className=" mt-10  bg-red-500   w-80 mx-auto h-72 hover:cursor-pointer "
                  key={curElem._id}
                  onClick={() => {
                    navigate(`/blog/${curElem._id}`);
                  }}
                >
                  <div className="imgDiv bg-yellow-500 h-[70%] mx-auto">
                    <img
                      src={curElem.imagePath}
                      alt="no image"
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className=" mt-1 pl-2 font-bold">{curElem.title} </h3>
                  <p className="mt-1 pl-2">{curElem.description}</p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <LoaderSpinner text="Loading blogs" />
      )}
    </>
  );
};

export default Blogs;
