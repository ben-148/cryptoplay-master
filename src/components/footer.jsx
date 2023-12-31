import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const Mfooter = () => {
  const navigate = useNavigate();

  return (
    <Box
      border={1}
      borderColor="grey"
      borderRadius={16}
      p={1}
      mt={2}
      width="80%"
      marginX="auto"
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.HOME)}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.TRADE)}
          label="Assets"
          icon={<CurrencyExchangeIcon />}
        />
        <BottomNavigationAction
          onClick={() => navigate(ROUTES.ABOUT)}
          label="About Us"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Mfooter;
