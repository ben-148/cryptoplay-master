import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import "@fontsource/oswald";

import ListItemComponent from "../components/ListItemComponent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CoinsManagmentPage = () => {
  const navigate = useNavigate();

  const [coinsArr, setCoinsArr] = useState(null);

  useEffect(() => {
    axios
      .get("/coins")
      .then(({ data }) => {
        setCoinsArr(data);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, []);

  if (!coinsArr) {
    return <CircularProgress />;
  }

  const handleDeleteFromInitialData = async (id) => {
    try {
      await axios.delete("/coins/" + id);
      setCoinsArr((prevCoinsArr) =>
        prevCoinsArr.filter((coin) => coin._id !== id)
      );
      toast.error("The coin has been successfully deleted");
    } catch (err) {
      console.log("error on delete", err.response.data);
    }
  };

  const handleEditFromInitialData = (id) => {
    navigate(`/editcoin/${id}`);
  };

  const handleAddNewCoin = () => {
    navigate("/addcoin");
  };

  return (
    <Box textAlign="center">
      <Typography
        variant="h3"
        style={{ fontWeight: 600, fontFamily: "'Oswald', sans-serif" }}
      >
        coins manage
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {coinsArr.map((item) => (
          <Grid item xs={4} sm={6} md={4} lg={7} key={item._id}>
            <ListItemComponent
              id={item._id}
              name={item.name}
              codeName={item.codeName}
              price={item.price}
              img={item.image.url}
              onDelete={handleDeleteFromInitialData}
              onEdit={handleEditFromInitialData}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleAddNewCoin}>
          Add New Coin
        </Button>
      </Box>
    </Box>
  );
};

export default CoinsManagmentPage;
