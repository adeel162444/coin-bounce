import React, { useState } from "react";
import { useEffect } from "react";
import LoaderSpinner from "./loadSpinner/LoaderSpinner";

const CoinTable = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const text = "Loading crypto currencies data";
  const getCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
      );
      const data = await response.json();
      console.log("data", data);
      setCryptoData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const sortArray = (property) => {
    if (property == "price") {
      const descendingData = [...cryptoData].sort(
        (a, b) => b.current_price - a.current_price
      );
      setCryptoData(descendingData);
      console.log("descending data", descendingData);
    }
  };
  useEffect(() => {
    getCryptoData();
  }, []);
  console.log("came in coin table");

  return (
    <>
      {cryptoData.length > 0 ? (
        <section className="mt-6">
          <div className=" text-xl text-center">Crypto Currencies</div>

          <div class="container mx-auto p-6 font-mono">
            <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
              <div class="w-full overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th class="px-4 py-3">Coin</th>
                      <th class="px-4 py-3">Symbol</th>
                      <th
                        class="px-4 py-3"
                        onClick={() => sortArray("price")}
                        className=" hover:cursor-pointer"
                      >
                        Price
                      </th>
                      <th class="px-4 py-3">24h</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    {cryptoData.map((curElem, index) => {
                      return (
                        <tr class="text-gray-700">
                          <td class="px-4 py-3 border">
                            <div class="flex items-center text-sm">
                              <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  class="object-cover w-full h-full rounded-full"
                                  src={curElem.image}
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  class="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p class="font-semibold text-black">
                                  {curElem.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-4 py-3 text-ms font-semibold border">
                            {curElem.symbol}
                          </td>
                          <td class="px-4 py-3 text-ms font-semibold border">
                            ${curElem.current_price}
                          </td>
                          <td
                            class={`px-4 py-3 text-sm border ${
                              curElem.price_change_percentage_24h > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {curElem.price_change_percentage_24h}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <LoaderSpinner text={text} />
      )}
    </>
  );
};

export default CoinTable;
