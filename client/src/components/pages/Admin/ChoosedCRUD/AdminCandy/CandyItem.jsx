import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux"
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import ClearLink from "../../../../UI/ClearLink";
import { deleteCandy } from "../../../../../redux/features/candies/candiesActionCreators";
import UpdateCandyModal from "./UpdateCandyModal";

const CandyItem = ({ candy }) => {
  const {id, name, price } = candy

  const [updateModalState, setUpdateModalState] = useState(false)

  const handleUpdateModalOpened = useCallback(() => setUpdateModalState(true), [])
  const handleUpdateModalClosed = useCallback(() => setUpdateModalState(false), [])

  const dispatch = useDispatch()

  const handleDeleteClicked = useCallback(() => {
    dispatch(deleteCandy(id))
    .unwrap()
    .catch((error) => {
      alert(error)
    })
  }, [dispatch, id])


  return (
    <ListItem
      sx={{border: "1px solid black", borderRadius: "0.5em", borderColor: "ButtonShadow"}}
      secondaryAction={
        <>
          <IconButton 
            edge="end" 
            aria-label="change"
            onClick={handleUpdateModalOpened}
            >
              <EditIcon />
          </IconButton>

          <IconButton 
            edge="end" 
            aria-label="delete"
            onClick={handleDeleteClicked}
            >
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

      {updateModalState && <UpdateCandyModal candy={candy} modalState={updateModalState} handleModalClosed={handleUpdateModalClosed} />}


    </ListItem>
  );
};

export default CandyItem;

CandyItem.propTypes = {
  candy: PropTypes.object.isRequired,
};
