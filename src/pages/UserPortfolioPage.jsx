import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import "@fontsource/oswald";

import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPortfolioPage = () => {
  const userId = useSelector((bigPie) =>
    bigPie.authSlice.payload?.hasOwnProperty("_id")
      ? bigPie.authSlice.payload._id
      : null
  );

  const [userOwnedCoins, setUserOwnedCoins] = useState([]);
  const [userPortfolio, setUserPorfolio] = useState([]);
  const [userUsdtCredit, setUserUsdtCredit] = useState(null);
  const [totalWorth, setTotalWorth] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: userData } = await axios.get(`/users/user/info`);
        const portfolio = Array.isArray(userData.portfolio)
          ? userData.portfolio
          : [];
        setUserUsdtCredit(userData.amount);
        const { data: allCoinsData } = await axios.get(`/coins`);
        const userOwnedCoins = allCoinsData.filter((coin) =>
          portfolio.some((userCoin) => userCoin.coinId === coin._id)
        );

        setUserOwnedCoins(userOwnedCoins);
        setUserPorfolio(portfolio);

        const calculatedTotalWorth =
          userData.amount +
          portfolio.reduce(
            (total, coin) =>
              total +
              (userOwnedCoins.find((ownedCoin) => ownedCoin._id === coin.coinId)
                ?.price || 0) *
                coin.amount,
            0
          );
        setTotalWorth(calculatedTotalWorth);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const tradeBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  return (
    <Container>
      <Box my={4} textAlign="center">
        <Typography
          variant="h3"
          mb={4}
          style={{ fontWeight: 600, fontFamily: "'Oswald', sans-serif" }}
        >
          Your Portfolio
        </Typography>
        {userOwnedCoins.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>LOGO</TableCell>
                  <TableCell>Coin</TableCell>
                  <TableCell>Current Price</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Worth in $</TableCell>
                  <TableCell>ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOwnedCoins.map((coin) => {
                  const userCoin = userPortfolio.find(
                    (userCoin) => userCoin.coinId === coin._id
                  );
                  const worth = userCoin
                    ? parseFloat(coin.price) * parseFloat(userCoin.amount)
                    : 0;

                  return (
                    <TableRow key={coin._id}>
                      <TableCell>
                        <img
                          src={coin.image.url}
                          alt={coin.image.alt}
                          style={{ width: "20px", height: "20px" }}
                        />
                      </TableCell>
                      <TableCell>{coin.name}</TableCell>
                      <TableCell>$ {coin.price}</TableCell>
                      <TableCell>
                        {userCoin ? userCoin.amount : "N/A"} {coin.codeName}
                      </TableCell>
                      <TableCell>$ {worth.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button
                          variant="text"
                          color="primary"
                          onClick={() => tradeBtnClick(coin._id)}
                        >
                          TRADE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={4} align="right">
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
                    USDT CREDIT:
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{ fontWeight: "bold", color: "#2196F3" }}
                  >
                    $ {userUsdtCredit}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    Total Portfolio Worth:
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    style={{ fontWeight: "bold", color: "#2196F3" }}
                  >
                    ${totalWorth?.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box>
            <img
              src="https://plus.unsplash.com/premium_photo-1675055730251-9f3990f1f9d5?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Empty Portfolio"
              style={{
                maxWidth: "100%",
                maxHeight: "350px",
                marginBottom: "16px",
              }}
            />
            <Typography variant="h5">
              You don't have any coins in your portfolio yet.
            </Typography>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/trade")}
            >
              Go to TRADE!
            </Button>
          </Box>
        )}{" "}
      </Box>
    </Container>
  );
};

export default UserPortfolioPage;
