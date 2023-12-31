import { TextField } from "@mui/material";
import React from "react";

const EditCoinPageFieldComponent = ({
  nameOfInput,
  typeofInput,
  isReq,
  onInputeChange,
  value,
}) => {
  const handleInputChange = () => {
    onInputeChange();
  };

  return (
    <TextField
      name={nameOfInput}
      required={isReq}
      fullWidth
      id={typeofInput}
      label={nameOfInput}
      value={value}
      onChange={onInputeChange}
    />
  );
};

export default EditCoinPageFieldComponent;
