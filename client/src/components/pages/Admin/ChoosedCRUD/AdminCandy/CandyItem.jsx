import React from "react";
import PropTypes from "prop-types";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import ClearLink from "../../../../UI/ClearLink";

const CandyItem = ({ candy }) => {
  const {id, name, price } = candy
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="change">
            <EditIcon />
          </IconButton>

          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
      <ClearLink to={`/candy/${id}`}>
        <Avatar>
          <CakeIcon />
        </Avatar>
      </ClearLink>
      </ListItemAvatar>
      <ListItemText>
      <ClearLink to={`/candy/${id}`}>
        <Typography variant="button">
          {`id: ${id}. Name: ${name} , ${price} RUB`}
        </Typography>
      </ClearLink>
      </ListItemText>
    </ListItem>
  );
};

export default CandyItem;

CandyItem.propTypes = {
  candy: PropTypes.object.isRequired,
};
