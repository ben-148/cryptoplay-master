import React from "react";
import {
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Button,
  CardMedia,
} from "@mui/material";

const ListItemComponent = ({
  img,
  id,
  name,
  codeName,
  price,
  onEdit,
  onDelete,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <CardMedia
            component="img"
            image={img}
            style={{ height: "50px", width: "50px", marginRight: "16px" }}
          />
        </ListItemIcon>
        <ListItemText
          primary={name}
          secondary={`Code Name: ${codeName} | Price: $${price}`}
        />
        <Button onClick={handleEditBtnClick} variant="outlined" color="primary">
          Edit
        </Button>
        <Button
          onClick={handleDeleteBtnClick}
          variant="outlined"
          color="secondary"
        >
          Delete
        </Button>
      </ListItem>
      <Divider />
    </>
  );
};

export default ListItemComponent;
