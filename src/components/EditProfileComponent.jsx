import { TextField } from "@mui/material";
import React from "react";

const EditProfileFieldComponent = ({
  nameOfInput,
  typeofInput,
  isReq,
  onInputeChange,
  value,
  disabled,
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
      disabled={disabled}
    />
  );
};

export default EditProfileFieldComponent;
