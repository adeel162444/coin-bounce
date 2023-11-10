import React, { useEffect, useState } from "react";
import LoaderSpinner from "./loadSpinner/LoaderSpinner";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const text = "loading home page";
  const navigateToInfo = (url) => {
    window.open(url, "_blank");
  };
  const getNewsData = async () => {
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`
      );
      const data = await response.json();

      setNewsData(data.articles.slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <section className=" pb-4">
      {newsData.length > 0 ? (
        <>
          <div className=" font-semibold text-center mt-11">
            Latest Articles
          </div>
          <div className=" flex flex-wrap mt-6 justify-center gap-6   md:w-[98%] w-[90%]  sm:w-[90%] mx-auto">
            {newsData.map((curElem, index) => {
              return (
                <div
                  key={index}
                  onClick={() => navigateToInfo(curElem.url)}
                  class=" md:w-[20%] sm:w-[40%] rounded overflow-hidden shadow-lg hover:cursor-pointer "
                >
                  <img
                    class="w-full h-[70%]"
                    src={curElem.urlToImage}
                    alt="Sunset in the mountains"
                  />
                  <div class=" py-4">
                    <div class="font-bold text-xs  md:text-sm mb-2 px-2">
                      {curElem.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <LoaderSpinner text={text} />
      )}
    </section>
  );
};

export default LatestNews;
