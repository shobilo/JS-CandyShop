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
import DeleteCandyModal from "./DeleteCandyModal";

const CandyItem = ({ candy }) => {
  const {id, name} = candy

  const [updateModalState, setUpdateModalState] = useState(false)
  const [deleteModalState, setDeleteModalState] = useState(false)

  const handleUpdateModalOpened = useCallback(() => setUpdateModalState(true), [])
  const handleUpdateModalClosed = useCallback(() => setUpdateModalState(false), [])
  
  const handleDeleteModalOpened = useCallback(() => setDeleteModalState(true), [])
  const handleDeleteModalClosed = useCallback(() => setDeleteModalState(false), [])

  const dispatch = useDispatch()

  const handleDeleteClicked = useCallback(() => {
    dispatch(deleteCandy(id))
    .unwrap()
      .then(() => {
        handleDeleteModalClosed()
      })
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
            onClick={handleDeleteModalOpened}
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
          {`${name}`}
        </Typography>
      </ClearLink>
      </ListItemText>

      {updateModalState &&
        <UpdateCandyModal
          candy={candy}
          modalState={updateModalState}
          handleModalClosed={handleUpdateModalClosed}
        />
      }
      
      {deleteModalState &&
        <DeleteCandyModal
          modalState={deleteModalState}
          handleModalClosed={handleDeleteModalClosed}
          handleDeleteClicked={handleDeleteClicked}
        />
      }
      
    </ListItem>
  );
};

export default CandyItem;

CandyItem.propTypes = {
  candy: PropTypes.object.isRequired,
};
