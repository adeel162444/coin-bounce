import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoaderSpinner from "../components/loadSpinner/LoaderSpinner";
import axios from "axios";
import { useSelector } from "react-redux";
import Comments from "../components/Comments";
const BlogDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [detail, setBlogDetail] = useState(null);
  const deleteBlog = async () => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_BASE_PATH}/api/blog/delete/${params.id}`,

        { withCredentials: true }
      );
      console.log(data);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/blog/single/${params.id}`,
        { withCredentials: true }
      );
      setBlogDetail(data.blog);
      console.log("blog details", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getSingleBlogDetails();

    return () => {
      setBlogDetail(null);
    };
  }, []);

  const userData = useSelector((state) => {
    return state.user;
  });

  return (
    <section class="py-20 overflow-hidden bg-white font-poppins dark:bg-gray-800">
      {detail ? (
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 md:w-1/2 ">
              <div class="sticky top-0 z-50 overflow-hidden ">
                <div class="relative mb-6 lg:mb-10">
                  <img
                    src={detail.imagePath}
                    alt=""
                    class="object-contain w-full h-full "
                  />
                </div>
              </div>
              {detail.userName === userData.user.userName ? (
                <div className=" w-[100%] justify-center gap-5 flex bg-yellow-500">
                  {" "}
                  <button
                    className=" bg-blue-500 p-2  "
                    onClick={() => deleteBlog()}
                  >
                    Delete Blog
                  </button>
                  <button
                    className=" bg-blue-500 p-2  "
                    onClick={() => navigate(`/blog-update/${params.id}`)}
                  >
                    Update Blog
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div class="w-full px-4 md:w-1/2 ">
              <div class="lg:pl-20 bg-yellow-500">
                <div class="pb-6 mb-8 border-b border-gray-200 dark:border-gray-700 ">
                  <h2 class="max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-300 md:text-4xl">
                    {detail.title}
                  </h2>

                  <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {detail.description}
                  </p>
                </div>
                <div className="author">
                  <h1 className=" font-bold text-3xl ">Author Details </h1>
                  <span>
                    <p className=" font-bold mt-4">Author name:</p>
                  </span>
                  <p> {detail.name} </p>
                  <span>
                    <p className=" font-bold mt-4">Author user name:</p>
                  </span>{" "}
                  <p> {detail.userName} </p>
                </div>
              </div>
              <Comments blogId={params.id} />
            </div>
          </div>
        </div>
      ) : (
        <LoaderSpinner text="Loading Blog Detail" />
      )}
    </section>
  );
};

export default BlogDetails;
