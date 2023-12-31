import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" mb={4}>
        Welcome to CryptoPlay!
      </Typography>
      <Typography variant="body1" mb={4}>
        Congratulations on creating your account. You are now ready to start
        trading cryptocurrencies.
      </Typography>
      <img
        src="https://images.unsplash.com/photo-1614562183670-b5c7d533ac1e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="buy coins"
        style={{
          maxWidth: "100%",
          maxHeight: "350px",
          marginBottom: "16px",
        }}
      />
      <Typography variant="body1" mb={4}>
        To help you get started,{" "}
        <span className="purple-link">
          We've added 1000 USDT to your account.
        </span>
        &nbsp; Feel free to explore the platform and make your first trades!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        let's login!
      </Button>
    </Box>
  );
};

export default Welcome;
