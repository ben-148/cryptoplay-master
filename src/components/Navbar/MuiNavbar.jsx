import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useNavigate } from "react-router-dom";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import ProfileComponent from "./ProfileComponent";
import MuiNavBarHambComponent from "./MuiNavBarHambComponent";
import WalletIcon from "@mui/icons-material/Wallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import KeyIcon from "@mui/icons-material/Key";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";

// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
    icon: <HomeIcon />,
  },
  { label: "About", url: ROUTES.ABOUT, icon: <InfoIcon /> },
  {
    label: "TRADE",
    url: ROUTES.TRADE,
    icon: <CurrencyExchangeIcon />,
  },
];

// not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
    icon: <HowToRegIcon />,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
    icon: <LoginIcon />,
  },
];

// logged in users
const authedPages = [
  {
    label: "Favorites",
    url: ROUTES.FAV,
    icon: <FavoriteIcon />,
  },
  { label: "Portfolio", url: ROUTES.PORTFOLIO, icon: <WalletIcon /> },
];

const avatarMenu = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

const adminPages = [
  { label: "ADMIN", url: ROUTES.ADMINZONE, icon: <KeyIcon /> },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const navigate = useNavigate();
  const isAdmin = payload && payload.isAdmin;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  const renderPages = () => {
    const allPages = [...pages];

    if (isLoggedIn) {
      allPages.push(...authedPages);
    } else {
      allPages.push(...notAuthPages);
    }

    if (isAdmin) {
      allPages.push(...adminPages);
    }

    return allPages.map((page) => (
      <NavLinkComponent key={page.url} {...page} />
    ));
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "none", md: "inline" },
              cursor: "pointer",
            }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/favicon3.png`}
              alt="Favicon"
              style={{ marginRight: "8px", width: "64px", height: "64px" }}
            />
          </Typography>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {renderPages()}
          </Box>
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
              cursor: "pointer",
            }}
          >
            {isDarkTheme ? (
              <LightModeIcon onClick={changeTheme} />
            ) : (
              <ModeNightIcon onClick={changeTheme} />
            )}{" "}
          </Box>
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              id="hamburger-icon-button"
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MuiNavBarHambComponent
              anchorElNavProp={anchorElNav}
              handleCloseNavMenuProp={handleCloseNavMenu}
              pagesArray={pages}
              isLoggedInProp={isLoggedIn}
              authedPagesProp={authedPages}
              logoutClickProp={logoutClick}
              notAuthPagesProp={notAuthPages}
              isAdminProp={isAdmin}
              adminPagesArr={adminPages}
            />
          </Box>
          {isLoggedIn && (
            <ProfileComponent
              profilePages={avatarMenu}
              logoutClickProp={logoutClick}
            />
          )}{" "}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
