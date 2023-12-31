import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const Mfooter = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.HOME)}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.FAV)}
          label="Favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ABOUT)}
          label="About Us"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
      <Typography variant="caption" align="center">
        &copy; 2023 Ben Oved. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Mfooter;
