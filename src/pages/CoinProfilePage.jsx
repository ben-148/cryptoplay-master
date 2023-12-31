import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const CoinProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`/coins/${id}`);
        setCoinData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [id]);

  if (!coinData) {
    return <CircularProgress />;
  }

  const tradeBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h1" style={{ fontFamily: "'Oswald', sans-serif" }}>
        {coinData.name} PROFILE
      </Typography>
      {coinData.image && coinData.image.url && (
        <img
          src={coinData.image.url}
          alt={`Logo of ${coinData.name}`}
          style={{
            maxWidth: "100%",
            maxHeight: "150px",
            marginTop: "20px",
          }}
        />
      )}

      <Grid container spacing={3} justifyContent="center" mt={0}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">SYMBOL: {coinData.codeName}</Typography>
          <Typography variant="h5">Price: ${coinData.price}</Typography>
          <Typography variant="h6" mb={3}>
            Market Cap: ${coinData.market_cap}
          </Typography>
          <Typography variant="body" mt={10}>
            ABOUT {coinData.name}: {coinData.description}
          </Typography>
          <br></br>
          <Button
            variant="contained"
            color="primary"
            onClick={() => tradeBtnClick(id)}
            style={{ marginTop: "10px" }}
          >
            <CurrencyExchangeIcon /> &nbsp; TRADE {coinData.name}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CoinProfilePage;
