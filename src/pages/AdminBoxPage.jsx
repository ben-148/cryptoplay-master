import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const AdminBoxPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Fragment>
        <br></br>
        <Typography
          variant="h1"
          style={{ fontWeight: 600, fontFamily: "'Oswald', sans-serif" }}
        >
          ADMIN ZONE Page
        </Typography>{" "}
        <Box mt={10} mb={10}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "10px" }}
            component={Link}
            to="/admin/coinsManagment"
          >
            Coins Management
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/crm"
          >
            User Managment
          </Button>
        </Box>
        <Outlet backgroundColor="red" />
      </Fragment>
    </Box>
  );
};

export default AdminBoxPage;
