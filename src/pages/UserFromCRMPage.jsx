import React, { useEffect, useState } from "react";
import axios from "axios";

const UserFromCRMPage = ({ id, onClose }) => {
  const [user, setUser] = useState(null);
  const [newPortfolio, setNewPortfolio] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/${id}`);
        setUser(response.data);

        const { portfolio } = response.data;
        const { data: allCoinsData } = await axios.get(`/coins`);
        const userOwnedCoins = allCoinsData.filter((coin) =>
          portfolio.some((userCoin) => userCoin.coinId === coin._id)
        );

        const calculatedNewPortfolio = portfolio.map((coin) => {
          const matchingCoin = userOwnedCoins.find(
            (ownedCoin) => ownedCoin._id === coin.coinId
          );

          return {
            coinId: coin.coinId,
            amount: coin.amount,
            price: matchingCoin ? matchingCoin.price : 0,
            name: matchingCoin ? matchingCoin.name : "",
            codeName: matchingCoin ? matchingCoin.codeName : "",
            imageUrl: matchingCoin ? matchingCoin.image.url : "",
          };
        });

        setNewPortfolio(calculatedNewPortfolio); // Update newPortfolio state

        const totalValue =
          response.data.amount +
          calculatedNewPortfolio.reduce(
            (total, coin) => total + coin.amount * coin.price,
            0
          );

        setPortfolioValue(totalValue);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleClosePopup = () => {
    // Call the onClose function to close the popup
    onClose();
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>User Profile:</h2>
      <div>
        <p>
          Name:{" "}
          {`${user.name.firstName} ${user.name.middleName} ${user.name.lastName}`}
        </p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Country: {user.address.country}</p>
        <p>City: {user.address.city}</p>
      </div>
      <div>
        <br></br>
        <h3>User Portfolio</h3>
        <ul>
          {newPortfolio.map((coin, index) => {
            const valueAmount = coin.amount * coin.price;
            const formattedAmount = parseFloat(coin.amount).toFixed(3);
            return (
              <div key={index} className="coin-item">
                <li>
                  <img
                    src={coin.imageUrl}
                    alt={coin.name}
                    className="coin-logo"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "8px",
                    }}
                  />
                  {coin.name}, Amount: {formattedAmount} {coin.codeName} ,
                  Value: $ {valueAmount}
                </li>
              </div>
            );
          })}
          <li>
            <img
              src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029"
              alt="tether"
              className="coin-logo"
              style={{
                width: "16px",
                height: "16px",
                marginRight: "8px",
              }}
            />
            USDT CREDIT: $ {user.amount}
          </li>
        </ul>
      </div>
      <div>
        <br></br>
        <h3>Total Portfolio Value</h3>
        <p> $ {portfolioValue}</p>
      </div>
      <div>
        <button onClick={handleClosePopup}>Close Popup</button>
      </div>
    </div>
  );
};

export default UserFromCRMPage;
