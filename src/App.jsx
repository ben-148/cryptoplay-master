import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

import Router from "./routes/Router";
import { useSelector } from "react-redux";

import MuiNavbar from "./components/Navbar/MuiNavbar";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoggedIn from "./hooks/useLoggedIn";
import Mfooter from "./components/footer";
import CopyrightTypography from "./components/CopyrightTypography";
import UpdateCoinData from "./initalData/UpdateCoinData";

const light = {
  palette: {
    mode: "light",
    primary: {
      main: "#BA8AFF",
      gold: "#FFD700",
    },
    secondary: {
      main: blue[500],
    },
  },
};

const dark = {
  palette: {
    mode: "dark",
    primary: {
      main: "#BA8AFF",
    },
    text: {
      gold: "#FFD700",
    },
  },
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();

  useEffect(() => {
    (async () => {
      await loggedIn();
      await UpdateCoinData();
      setIsLoading(false);
    })();
  }, []);

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />

      <Container>
        <header>
          <MuiNavbar />
        </header>
        <main>{isLoading ? <CircularProgress /> : <Router />}</main>
        <footer>
          <Mfooter />
        </footer>
        <CopyrightTypography />
      </Container>
    </ThemeProvider>
  );
}

export default App;
