import { useState, useEffect } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import validateRegisterSchema from "../validation/registerValidation";
import RegisterFieldComponent from "../components/RegisterComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";

const RegisterPage = () => {
  const [serverError, setServerError] = useState(null); // Add this state variable

  const [enableRegister, setenableRegister] = useState(true);
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (serverError) {
      console.log("Server Error:", serverError);

      // Extract the error message from the object
      const errorMessage = serverError.error || "An error occurred";

      toast.error(errorMessage); // Display the toast notification with the extracted error message
    }
  }, [serverError]);

  const arrOfInputs = [
    { inputName: "First Name", idAndKey: "firstName", isReq: true },
    { inputName: "Middle Name", idAndKey: "middleName", isReq: false },
    { inputName: "Last Name", idAndKey: "lastName", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Password", idAndKey: "password", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "Zip Code", idAndKey: "zip", isReq: false },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
  ];
  const handleBtnClick = async (ev) => {
    try {
      const JoiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(JoiResponse);
      if (JoiResponse) {
        return;
      }
      if (!inputState.zip) {
        inputState.zip = 1;
      }
      await axios.post("/users", {
        name: {
          firstName: inputState.firstName,
          middleName: inputState.middleName,
          lastName: inputState.lastName,
        },
        address: {
          state: inputState.state,
          country: inputState.country,
          city: inputState.city,
          street: inputState.street,
          houseNumber: inputState.houseNumber,
          zip: inputState.zip,
        },
        email: inputState.email,
        password: inputState.password,
        phone: inputState.phone,
        portfolio: [],
      });
      toast.success(
        "🦄 Mazal Tov, you are registered member now! lets do login.. :) "
      );

      navigate("/welcome", { replace: true });
    } catch (err) {
      console.log(
        "🚀 ~ file: RegisterPage.jsx:77 ~ handleBtnClick ~ response:",
        err.response.data
      );
      setServerError(err.response.data); // Set the server error in case of an error
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setenableRegister(false);
      return;
    }

    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        joiResponse[key] = "";
      }
    }
    setInputsErrorsState(joiResponse);
    setenableRegister(true);
  };
  const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      } else {
      }
    }
    setInputsErrorsState(null);
    setInputState(cloneInputState);
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {arrOfInputs.map((input) => (
              <Grid item xs={12} sm={6} key={input.inputName}>
                <RegisterFieldComponent
                  nameOfInput={input.inputName}
                  typeofInput={input.idAndKey}
                  isReq={input.isReq}
                  onInputeChange={handleInputChange}
                  value={inputState[input.idAndKey]}
                />
                {inputsErrorsState && inputsErrorsState[input.idAndKey] && (
                  <Alert severity="warning">
                    {inputsErrorsState[input.idAndKey].map((item) => (
                      <div key={input.idAndKey + "-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
          </Grid>
          <FormButtonsComponent
            onCancel={handleCancelBtnClick}
            onReset={handleClearClick}
            onRegister={handleBtnClick}
            clickBtnText="Make an account"
            disableProp={enableRegister}
          />
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link to={ROUTES.LOGIN}>
                <Typography variant="body2">
                  Alredy have an account ? Sign In
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
