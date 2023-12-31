import React, { useState } from "react";
import "./Hero.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import validateLoginSchema from "../validation/loginValidation";
import { useSelector } from "react-redux";

import useLoggedIn from "../hooks/useLoggedIn";

const Hero = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();
  const loggedIn = useLoggedIn();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const handleLogin = async () => {
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      toast.success("🦄 Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error("🦄 Invalid email or password");
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = { ...inputState };
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className={`hero ${isDarkTheme ? "dark-mode" : ""}`}>
      <div className="container">
        {/* Left Side */}
        <div className="left">
          <h1>CryptoPlay - Your Crypto Playground</h1>

          {payload ? (
            <>
              <p>Welcome {payload.firstName}! </p>
              <p>Explore your CryptoPlay experience,</p>
              <p>Check out what yours portfolio telling you today</p>
              <button className="btn" onClick={() => navigate("/portfolio")}>
                {payload.firstName}'s PORTFOLIO
              </button>
            </>
          ) : (
            <>
              <p>
                Welcome to your Crypto Playground! Dive into the exciting world
                of cryptocurrency trading on our platform. Sign up now and
                receive $1000 instantly to kickstart your journey. Buy and sell
                crypto effortlessly as the prices update in real-time. This is
                your opportunity to explore and trade without any financial
                risk. Join us and learn the ropes of crypto trading!
              </p>

              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={inputState.email}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: isDarkTheme ? "#333" : "#fff",
                    color: isDarkTheme ? "#fff" : "#000",
                  }}
                />
                <button className="btn" onClick={handleLogin}>
                  LOG IN
                </button>
                {inputsErrorsState && inputsErrorsState.email && (
                  <Alert severity="warning">
                    {inputsErrorsState.email.map((item) => (
                      <div key={"email-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}

                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={inputState.password}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: isDarkTheme ? "#333" : "#fff",
                    color: isDarkTheme ? "#fff" : "#000",
                  }}
                />
                {inputsErrorsState && inputsErrorsState.password && (
                  <Alert severity="warning">
                    {inputsErrorsState.password.map((item) => (
                      <div key={"password-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </div>
              <p>
                Don't have an account yet?{" "}
                <Link to="/register" className="purple-link">
                  Sign up!
                </Link>
              </p>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="right">
          <div className="img-container">
            <img
              src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029"
              alt=""
              style={{ maxWidth: "50%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
