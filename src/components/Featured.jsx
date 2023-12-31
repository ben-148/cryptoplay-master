import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Featured.css";

const Featured = () => {
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const navigate = useNavigate();
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get("/coins");
        const serverData = serverResponse.data;
        setServerData(serverData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Oops");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`featured ${isDarkTheme ? "dark-mode" : ""}`}>
      <div className="container">
        <div className="left">
          <h2>Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin</h2>
          <p>
            Real Time Prices! Powered by "CoinGecko.com". See all available
            Cryptocurrencies that you can trade!
          </p>
          <button className="btn" onClick={() => navigate("/trade")}>
            TRADE!
          </button>
        </div>

        <div className="right">
          {serverData.slice(0, 6).map((coinData, index) => (
            <Link
              key={index}
              to={`/coinProfile/${coinData._id}`} // Use the coin's ID in the URL
              className="card"
            >
              <div className="top">
                <img src={coinData.image.url} alt="" />
              </div>
              <div>
                <h5 className={isDarkTheme ? "dark-mode-h5" : ""}>
                  {coinData.name}
                </h5>
                <p>${coinData.price.toLocaleString()}</p>
              </div>
              <span
                className={parseFloat(coinData.change24) < 0 ? "red" : "green"}
              >
                {parseFloat(coinData.change24) < 0 ? (
                  <FiArrowDown className="icon" />
                ) : (
                  <FiArrowUpRight className="icon" />
                )}
                {parseFloat(coinData.change24).toFixed(2)}%
              </span>{" "}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
