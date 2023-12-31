import { Box, CircularProgress, Grid, Button } from "@mui/material";
import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import CoinCardComponent from "../components/CoinCardComponent";

const FavoritesPage = () => {
  const [coinsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/coins/get-my-fav-coins")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const handleDeleteFromFavorites = async (id) => {
    try {
      await axios.patch(`coins/coin-like/${id}`);
      setCardsArr((prevArr) => prevArr.filter((card) => card._id !== id));
      toast.success("Not Favorite Anymore");
    } catch (err) {
      toast.error("Failed to delete card");
    }
  };

  const cardProfileClick = (id) => {
    navigate(`/coinProfile/${id}`);
  };
  const buyBtnClick = (id) => {
    navigate(`/coinTrade/${id}`);
  };

  return (
    <Fragment>
      <Box textAlign="center">
        <br />

        <h1>Your Favorites CryptoCurrency</h1>
        <br />
        <br />
      </Box>
      <Box>
        <Grid container spacing={2} justifyContent="center">
          {Array.isArray(coinsArr) &&
            coinsArr.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id + Date.now()}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CoinCardComponent
                    id={item._id}
                    name={item.name}
                    codeName={item.codeName}
                    price={item.price}
                    img={item.image ? item.image.url : ""}
                    onImageClick={cardProfileClick}
                    onBuyClick={buyBtnClick}
                    change24={item.change24}
                  />

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteFromFavorites(item._id)}
                    style={{ marginTop: "10px" }}
                  >
                    <FavoriteBorderIcon />
                    Unlike
                  </Button>
                </div>
              </Grid>
            ))}
        </Grid>
        {!coinsArr && (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        )}
        {Array.isArray(coinsArr) && coinsArr.length === 0 && (
          <div style={{ textAlign: "center" }}>
            <h3>No coins found</h3>
          </div>
        )}
      </Box>
    </Fragment>
  );
};

export default FavoritesPage;
