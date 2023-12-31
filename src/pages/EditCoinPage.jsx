import { useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCoinParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";

import EditCoinPageFieldComponent from "../components/EditCoinPageComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";

const EditCoinPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputState, setInputState] = useState(null);
  const [disableEd, setDisableEdit] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  let coinNameRef = useRef(inputState ? inputState.name : "");

  const arrOfInputs = [
    { inputName: "Name", idAndKey: "name", isReq: true },
    { inputName: "CODE", idAndKey: "codeName", isReq: true },
    { inputName: "icon url", idAndKey: "url", isReq: true },
    { inputName: "description", idAndKey: "description", isReq: true },
  ];

  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCoinParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get(`/coins/${id}`);
        let newInputState = JSON.parse(JSON.stringify(data));
        coinNameRef.current = newInputState.name;
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.market_cap;
        delete newInputState.__v;
        setInputState(newInputState);
        if (!validateEditSchema(newInputState)) {
          setDisableEdit(false);
        }
      } catch (err) {}
    })();
  }, [id, navigate]);

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        if (!inputState.image) {
          inputState.image = {};
        }
        inputState.image.url = inputState.url;
        inputState.image.alt = inputState.alt;
        delete inputState.url;
        delete inputState.alt;
        await axios.put("/coins/" + id, inputState);
        toast.success("🦄 You did it! edit success :) ");

        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log(
        "🚀 ~ file: EditCoinPage.jsx:93 ~ handleSaveBtnClick ~ err:",
        err
      );
      toast.error("error");
    }
  };

  const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      }
    }
    const joiResponse = validateEditSchema(cloneInputState);

    setInputsErrorsState(joiResponse);
    setInputState(cloneInputState);
    setDisableEdit(true);
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setDisableEdit(false);
      return;
    }
    setDisableEdit(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorsState(joiResponse);
    console.log(
      "🚀 ~ file: EditCoinPage.jsx:136 ~ handleInputChange ~ joiResponse:",
      joiResponse
    );
  };

  if (!inputState) {
    return <CircularProgress />;
  }

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
          Edit {coinNameRef.current}
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState?.alt || ""}
          src={inputState?.url || atom}
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
          disableProp={disableEd}
        />
      </Box>
    </Container>
  );
};
export default EditCoinPage;
