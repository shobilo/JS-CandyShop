import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux"
import PropTypes from "prop-types";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import { deleteBrand } from "../../../../../redux/features/filtersData/filtersDataActionCreators";
import UpdateBrandModal from "./UpdateBrandModal";

const BrandTtem = ({ brand }) => {
  const dispatch = useDispatch()

  const { id, name } = brand

  const [updateModalState, setUpdateModalState] = useState(false)

  const handleUpdateModalOpened = useCallback(() => setUpdateModalState(true), [])
  const handleUpdateModalClosed = useCallback(() => setUpdateModalState(false), [])
  const handleDeleteClicked = useCallback(() => {
    dispatch(deleteBrand(id))
    .unwrap()
    .catch((error) => {
      console.error(error)
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
        <Avatar>
          <CakeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Typography variant="button">
          {`${name}, id: ${id}`}
        </Typography>
      </ListItemText>

      {updateModalState && <UpdateBrandModal brand={brand} modalState={updateModalState} handleModalClosed={handleUpdateModalClosed} />}

    </ListItem>
  );
};

export default BrandTtem;

BrandTtem.propTypes = {
  brand: PropTypes.object.isRequired,
};
