import { Box, CircularProgress, Grid, Typography, Button } from "@mui/material";
import "@fontsource/oswald";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import CoinCardComponent from "../components/CoinCardComponent";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AssetsPage = () => {
  const [originalCoinsArr, setOriginalCoinsArr] = useState(null);
  const [coinsArr, setCoinsArr] = useState(null);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [sortOrder, setSortOrder] = useState("desc");
  const [lastSortButton, setLastSortButton] = useState(null);

  const [sortOrderChange24, setSortOrderChange24] = useState("asc");

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  let qparams = useQueryParams();
  const navigate = useNavigate();
  let filter = qparams.filter || "";
  const filterFunc = useCallback(
    (data) => {
      if (!coinsArr && !data) {
        return;
      }
      if (qparams.filter) {
        filter = qparams.filter.toLowerCase();
      }
      if (!coinsArr && data) {
        setOriginalCoinsArr(data);
        setCoinsArr(
          data.filter(
            (coin) =>
              coin.name.toLowerCase().startsWith(filter) ||
              coin.codeName.toLowerCase().startsWith(filter)
          )
        );
        return;
      }
      if (originalCoinsArr) {
        let newOriginalCoinsArr = JSON.parse(JSON.stringify(originalCoinsArr));
        setCoinsArr(
          newOriginalCoinsArr.filter(
            (coin) =>
              coin.name.toLowerCase().startsWith(filter) ||
              coin.codeName.toLowerCase().startsWith(filter)
          )
        );
      }
    },
    [originalCoinsArr, qparams.filter]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverResponse = await axios.get("/coins");
        const serverData = serverResponse.data;

        filterFunc(serverData);
        setFavoriteStatus(
          serverData.reduce(
            (status, card) => ({
              ...status,
              [card._id]: card.likes.includes(payload?._id),
            }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Oops");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterFunc();
  }, [filterFunc, qparams.filter]);

  if (!coinsArr) {
    return <CircularProgress />;
  }

  const coinProfileClick = (id) => {
    navigate(`/coinProfile/${id}`);
  };
  const buyBtnClick = (id) => {
    if (!payload) {
      toast.error("Please sign up or sign in to perform this action");
      return;
    }

    navigate(`/coinTrade/${id}`);
  };
  const handleLikeFromInitialCardsArr = async (id) => {
    try {
      const response = await axios.patch("coins/coin-like/" + id);
      const updatedStatus = !favoriteStatus[id];
      setFavoriteStatus((prevStatus) => ({
        ...prevStatus,
        [id]: updatedStatus,
      }));
      const toastMessage = updatedStatus
        ? "🦄 coin added to favorites :)"
        : "🦄 coin removed from favorites ";
      toast.success(toastMessage);
    } catch (err) {
      toast.error("error when liking", err.response.data);
    }
  };

  const handleSortByMarketCap = () => {
    const sortedCoinsArr = [...coinsArr];

    // Sort the array based on market_cap
    sortedCoinsArr.sort((a, b) => {
      const marketCapA = a.market_cap;
      const marketCapB = b.market_cap;

      if (sortOrder === "desc") {
        return marketCapB - marketCapA; // Descending order
      } else {
        return marketCapA - marketCapB; // Ascending order
      }
    });

    // Update the coinsArr state with the sorted array
    setCoinsArr(sortedCoinsArr);
    setLastSortButton("marketCap");

    // Toggle the sorting order for the next click
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const handleSortByChange24 = () => {
    const newSortOrder = sortOrderChange24 === "desc" ? "asc" : "desc";
    setSortOrderChange24(newSortOrder);

    const sortedCoins = coinsArr.slice().sort((a, b) => {
      const valueA = a.change24;
      const valueB = b.change24;

      return newSortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });

    setCoinsArr(sortedCoins);
    setLastSortButton("change24");
  };

  return (
    <Box
      textAlign="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography
        variant="h1"
        style={{ fontWeight: 600, fontFamily: "'Oswald', sans-serif" }}
      >
        CryptoPlay
      </Typography>
      <Typography
        variant="h2"
        style={{
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Your EXCHANGE Playground
      </Typography>
      <Typography
        variant="h4"
        style={{
          fontFamily: "'Playfair Display', serif",
          marginBottom: "16px",
        }}
      >
        BUY SOME CRYPTO{" "}
      </Typography>
      <p>"Powered by CoinGecko"</p>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 2 }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSortByMarketCap}
            className={`button ${
              lastSortButton === "marketCap" ? "lastSortButton" : ""
            }`}
          >
            Market Cap
            {sortOrder === "desc" ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSortByChange24}
            className={`button ${
              lastSortButton === "change24" ? "lastSortButton" : ""
            }`}
          >
            last 24h Performance
            {sortOrderChange24 === "asc" ? (
              <ArrowDropDownIcon />
            ) : (
              <ArrowDropUpIcon />
            )}
          </Button>
        </Grid>
      </Grid>

      {filter && <p>search results - {filter} </p>}
      <Grid container spacing={2} justifyContent="center">
        {coinsArr.map((item) => (
          <Grid item xs={4} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CoinCardComponent
              id={item._id}
              name={item.name}
              codeName={item.codeName}
              price={item.price}
              img={item.image.url}
              onImageClick={coinProfileClick}
              onBuyClick={buyBtnClick}
              onLike={handleLikeFromInitialCardsArr}
              isFav={favoriteStatus[item._id]}
              loggedIn={payload}
              change24={item.change24}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AssetsPage;
