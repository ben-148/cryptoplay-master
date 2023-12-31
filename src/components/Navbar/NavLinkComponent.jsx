import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import "@fontsource/oswald";

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.mode === "dark" ? theme.palette.secondary.main : "black",

  "&.active": {
    color: "#FFD700",
    backgroundColor:
      theme.palette.mode === "dark" ? "#333" : theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.3s ease",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 600,
  fontFamily: "'Oswald', sans-serif",
}));

const NavLinkComponent = ({ url, label, icon, ...rest }) => {
  return (
    <StyledNavLink to={url} {...rest}>
      <StyledTypography
        component="div"
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        {icon && <div style={{ marginRight: "8px" }}>{icon}</div>}
        {label}
      </StyledTypography>
    </StyledNavLink>
  );
};

export default NavLinkComponent;
