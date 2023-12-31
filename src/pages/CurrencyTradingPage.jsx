import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  Grid,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const CurrencyTradingPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [updateCoinAmount, setUpdateCoinAmount] = useState(null);
  const [user, setUser] = useState(null);
  const [tradeAmount, setTradeAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");

  useEffect(() => {
    // Fetch coin data by id
    axios
      .get(`/coins/${id}`)
      .then((response) => {
        setCoinData(response.data);
      })
      .catch((error) => console.error("Error fetching coin data:", error));

    // Fetch user data separately
    axios
      .get(`/users/user/info`)
      .then((response) => {
        const { portfolio } = response.data;
        setUpdateCoinAmount(
          portfolio.find((item) => item.coinId === id)
            ? portfolio.find((item) => item.coinId === id).amount
            : 0
        );

        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleTrade = async (action) => {
    try {
      let amountToTrade;
      if (action === "buy") {
        // Buying logic
        amountToTrade = Number(tradeAmount) / Number(coinData.price);

        if (tradeAmount > user.amount) {
          toast.error("Insufficient funds");
          return;
        }

        if (tradeAmount <= 0) {
          toast.error("please insert numner bigger than 0");
          return;
        }
      } else if (action === "sell") {
        // Selling logic
        amountToTrade = Number(sellAmount);

        if (amountToTrade > updateCoinAmount) {
          toast.error("Insufficient coin amount");
          return;
        }
        if (sellAmount <= 0) {
          toast.error("please insert numner bigger than 0");
          return;
        }
      }
      const response = await axios.put(`/users/trade/${id}`, {
        coinId: id,
        tradeAmount: Number(tradeAmount),
        userId: user._id,
        coinAmount: amountToTrade,
        coinPrice: coinData.price,
        action,
      });
      const updatedUser = response.data.updatedUser;

      setUser(updatedUser);
      setTradeAmount("");
      setSellAmount("");
      toast.success("trade done");
    } catch (error) {
      console.error("Error performing trade:", error);
      toast.error("Error performing trade");
    }
  };

  useEffect(() => {
    // Ensure that the user state is updated before updating the coin amount
    if (user) {
      const coin = user.portfolio.find((item) => item.coinId === id);
      const updatedCoinAmount = coin ? coin.amount : 0;
      setUpdateCoinAmount(updatedCoinAmount);
    }
  }, [user, id]);

  const maxValue = async (action) => {
    if (action === "buy") {
      setTradeAmount(user.amount);
    } else if (action === "sell") {
      setSellAmount(updateCoinAmount);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="h3" mb={4}>
        Currency Trading
      </Typography>
      {coinData && user && (
        <>
          <Typography variant="h5" mb={2}>
            Trading {coinData.name} ({coinData.codeName})
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {/* Coin Card */}
            <Grid item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardHeader
                  title={coinData.name}
                  subheader={coinData.codeName}
                  avatar={
                    <img
                      src={coinData.image.url}
                      alt={coinData.codeName}
                      width="40"
                      height="40"
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body1">
                    Price: ${coinData.price}
                  </Typography>
                  <Typography variant="body1">
                    Your Amount: {updateCoinAmount} {coinData.codeName}
                  </Typography>
                  <Input
                    type="number"
                    value={sellAmount}
                    onChange={(e) => setSellAmount(e.target.value)}
                    placeholder="  Enter sell amount"
                    fullWidth
                    mb={2}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      style={{ marginLeft: "0", marginRight: "180px" }}
                      variant="outlined"
                      onClick={() => maxValue("sell")}
                    >
                      MAX
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleTrade("sell")}
                    >
                      Sell
                    </Button>
                  </div>{" "}
                </CardContent>
              </Card>
            </Grid>
            {/* USDT Card */}
            <Grid item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardHeader
                  title="USDT"
                  avatar={
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=029"
                      alt="USDT"
                      width="40"
                      height="40"
                    />
                  }
                />
                <CardContent>
                  <Typography variant="body1" style={{ marginTop: "24px" }}>
                    Your Amount: {user.amount} $
                  </Typography>
                  <Input
                    type="number"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="  Enter trade amount"
                    fullWidth
                    mb={2}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      style={{ marginLeft: "0", marginRight: "60px" }}
                      variant="outlined"
                      onClick={() => maxValue("buy")}
                    >
                      MAX
                    </Button>

                    <Button
                      style={{ marginLeft: "100px" }}
                      variant="contained"
                      color="success"
                      onClick={() => handleTrade("buy")}
                    >
                      Buy
                    </Button>
                  </div>{" "}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};
export default CurrencyTradingPage;
