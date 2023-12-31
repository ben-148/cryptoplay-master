import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Link,
  styled,
  useTheme,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  flexDirection: "column",
  height: "100%",
  marginBottom: theme.spacing(4),
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "100%",
  height: "200px",
  objectFit: "cover",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: 1,
}));

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleStartTrading = () => {
    navigate("/trade");
  };

  return (
    <StyledDiv>
      <Box textAlign="center">
        {" "}
        <h1>Welcome to CryptoPlay</h1>
      </Box>
      <br></br>
      <Typography variant="body1" paragraph>
        Hi, my name is Ben, and I am the creator of Crypto Play. I developed
        this project as part of my full-stack web studies, and truth be told,
        this is my final project. The project brings together my passion for the
        crypto world and the knowledge I gained during the course.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardMedia
              component="img"
              alt="additional-charts"
              image="https://images.unsplash.com/photo-1628238289656-6457bb6e6d76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fHww"
              title="additional-picture"
            />
            <StyledCardContent>
              <Typography variant="h6" component="h3">
                Explore Crypto World!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Discover more about different cryptocurrencies. Start your
                virtual trading experience! Use your 1000 USDT to kickstart your
                crypto journey.
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardMedia
              component="img"
              alt="charts"
              image="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3J5cHRvY3VycmVuY3l8ZW58MHx8MHx8fDA%3D"
              title="picture"
            />
            <StyledCardContent>
              <Typography variant="h6" component="h3">
                Real Time Prices
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The site interfaces with coinGecko, gives you real prices in
                real time, and makes the experience as real as possible
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <br></br>
      <Typography variant="h5" component="h2" gutterBottom>
        Your chance to experiment! Trade and Track Your Portfolio
      </Typography>
      <Typography variant="body1" paragraph>
        In essence, the platform allows users to immerse themselves in the
        experience of buying virtual currency, just as if it were real. Each
        registered user automatically receives 1000 virtual dollars, mimicking
        the USDT currency—a virtual currency whose value is pegged to the
        dollar. With these virtual dollars, you can go on a virtual currency
        shopping spree and monitor your portfolio's status in real-time.
      </Typography>
      <Typography variant="body1" paragraph>
        This setup provides users with the opportunity to engage in trading
        crypto, develop buying and selling strategies, all without risking their
        own money and without incurring any "tuition" fees. I've included a
        brief description for each coin, offering an educational opportunity to
        learn about dominant coins and the ideas behind them. The project is
        built using React (frontend) and Node.js (backend), with MUI Material
        tools utilized for site design. I invite you to explore and experiment
        with my project. I hope you enjoy it!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStartTrading}>
        Start Trading
      </Button>

      {/* Contact Information */}
      <Typography variant="body1" style={{ marginTop: theme.spacing(2) }}>
        I invite you to explore and experiment with my project. I hope you enjoy
        it! For questions and job offers, you can reach me at{" "}
        <Link href="mailto:benoved9@gmail.com" color="primary">
          benoved9@gmail.com
        </Link>
      </Typography>
    </StyledDiv>
  );
};

export default AboutPage;
