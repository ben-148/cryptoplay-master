import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";

const CoinCardComponent = ({
  img,
  name,
  codeName,
  price,
  id,
  loggedIn,
  isFav,
  onLike,
  onBuyClick,
  onImageClick,
  change24,
}) => {
  const handleLikeBtnClick = () => {
    onLike(id);
  };

  const handleImageBtnClick = () => {
    onImageClick(id);
  };
  const handleBuyBtnClick = () => {
    onBuyClick(id);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={1}
      justifyContent="center"
    >
      <Grid item>
        <Card
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "3px solid gold",
          }}
          raised
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={img}
              onClick={handleImageBtnClick}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item>
        <Card raised sx={{ borderRadius: 10, border: "4px solid silver" }}>
          <CardContent>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="h6">{codeName}</Typography>
            <Typography variant="body1">Price: $ {price}</Typography>
            <Typography variant="body1">
              24 hours:{" "}
              {change24 > 0 ? (
                <FiArrowUpRight style={{ color: "green" }} />
              ) : (
                <FiArrowDown style={{ color: "red" }} />
              )}
              <span style={{ color: change24 > 0 ? "green" : "red" }}>
                {change24.toFixed(2)}%
              </span>
            </Typography>
          </CardContent>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ marginTop: -1 }}
          >
            <Grid item>
              <Button
                variant="text"
                color="primary"
                onClick={handleBuyBtnClick}
              >
                <CurrencyExchangeIcon />
                TRADE
              </Button>
            </Grid>
            {loggedIn && (
              <Grid item>
                <Button onClick={handleLikeBtnClick}>
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </Button>
              </Grid>
            )}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

CoinCardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  codeName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default CoinCardComponent;
