import { useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateEditProfileSchema from "../validation/editProfileValidation";
import { Alert, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import FormButtonsComponent from "../components/FormButtonsComponent";
import useLoggedIn from "../hooks/useLoggedIn";
import EditProfileFieldComponent from "../components/EditProfileComponent";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [editMode, setEditMode] = useState(false);

  const loggedIn = useLoggedIn();
  const userId = useSelector((bigPie) =>
    bigPie.authSlice.payload?.hasOwnProperty("_id")
      ? bigPie.authSlice.payload._id
      : null
  );

  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
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
  const arrOfInputs = [
    { inputName: "First Name", idAndKey: "firstName", isReq: true },
    { inputName: "Middle Name", idAndKey: "middleName", isReq: false },
    { inputName: "Last Name", idAndKey: "lastName", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "Zip Code", idAndKey: "zip", isReq: false },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
  ];
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/user/info/");

        // Extract values from nested objects
        const { name, address, ...rest } = data;

        // Flatten the data object
        const flattenedData = {
          ...rest,
          firstName: name?.firstName || "",
          middleName: name?.middleName || "",
          lastName: name?.lastName || "",
          state: address?.state || "",
          country: address?.country || "",
          city: address?.city || "",
          street: address?.street || "",
          houseNumber: address?.houseNumber || "",
          zip: address?.zip || "",
        };

        setInputState(flattenedData);
      } catch (err) {
        console.log("error from axios", err.response.data);
      }
    })();
  }, [id]);
  if (!inputState) {
    return <CircularProgress />;
  }
  const handleSaveClick = async (ev) => {
    try {
      const newInputState = JSON.parse(JSON.stringify(inputState));
      delete newInputState._id;
      delete newInputState.createdAt;
      delete newInputState.isAdmin;
      delete newInputState.image;
      delete newInputState.password;
      delete newInputState.__v;
      const joiResponse = validateEditProfileSchema(newInputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      if (!inputState.zip) {
        inputState.zip = 1;
      }

      localStorage.setItem(
        "token",
        (
          await axios.put(`users/${userId}`, {
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
            amount: newInputState.amount,
            portfolio: inputState.portfolio,
            email: inputState.email,
            phone: inputState.phone,
          })
        ).data.token
      );

      loggedIn();
      setEditMode(false);

      toast.success(`The update was successful`);
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditProfileSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      return;
    }
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        joiResponse[key] = "";
      }
    }
    setInputsErrorsState(joiResponse);
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
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

  const handleEditClick = () => {
    setEditMode(true);
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
          Edit Profile Page
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {arrOfInputs.map((input) => (
              <Grid item xs={12} sm={6} key={input.inputName}>
                <EditProfileFieldComponent
                  nameOfInput={input.inputName}
                  typeofInput={input.idAndKey}
                  isReq={input.isReq}
                  onInputeChange={handleInputChange}
                  value={inputState[input.idAndKey]}
                  disabled={!editMode}
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
            onRegister={editMode ? handleSaveClick : handleEditClick}
            clickBtnText={editMode ? "Save" : "Edit Profile"}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default UserProfilePage;
