import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import ValidateAddCoinSchema from "../validation/addCoinValidation";
import FormButtonsComponent from "../components/FormButtonsComponent";
import EditCoinPageFieldComponent from "../components/EditCoinPageComponent";
import UpdateCoinData from "../initalData/UpdateCoinData";

const AddCoinPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enableEdit, setenableEdit] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [inputState, setInputState] = useState({
    name: "",
    codeName: "",
    price: "",
    url: "",
    description: "",
  });
  const arrOfInputs = [
    { inputName: "Name", idAndKey: "name", isReq: true },
    { inputName: "CODE", idAndKey: "codeName", isReq: true },
    { inputName: "price", idAndKey: "price", isReq: true },
    { inputName: "icon url", idAndKey: "url", isReq: true },
    { inputName: "description", idAndKey: "description", isReq: true },
  ];
  const handleSaveBtnClick = async (event) => {
    try {
      const joiResponse = ValidateAddCoinSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!inputState.url) {
        inputState.url = `${atom}`;
      }

      if (!joiResponse) {
        if (!inputState.image) {
          inputState.image = {};
        }
        inputState.image.url = inputState.url;
        inputState.image.alt = `${inputState.name} image`;
        delete inputState.url;

        await axios.post("/coins/", inputState);
        await UpdateCoinData();

        navigate(`/trade`);
        toast.success("coin added successfully!");
      }
    } catch (error) {
      toast.error("Failed to add coin. Please try again later.");
    }
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = ValidateAddCoinSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setenableEdit(false);
      return;
    }
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        joiResponse[key] = "";
      }
    }
    setInputsErrorsState(joiResponse);
    setenableEdit(true);
  };
  const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      }
    }
    setInputsErrorsState(null);
    setInputState(cloneInputState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Card Page
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <br></br>
        <Grid container spacing={2}>
          {arrOfInputs.map((input) => (
            <Grid item xs={12} sm={6} key={input.inputName}>
              <EditCoinPageFieldComponent
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
          onRegister={handleSaveBtnClick}
          clickBtnText="Save"
          disableProp={enableEdit}
        />
      </Box>
    </Container>
  );
};
export default AddCoinPage;
