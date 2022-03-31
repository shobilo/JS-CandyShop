import React from 'react';
import MUIModal from "../../../../UI/MUIModal";
import {Button, Grid, Typography} from "@mui/material";

function DeleteCandyModal(props) {
  const { modalState, handleModalClosed, handleDeleteClicked } = props
  
  return (
    <MUIModal
      modalState={modalState}
      handleModalClosed={handleModalClosed}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">
            Delete this item?
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteClicked}
            fullWidth
          >
            Yes
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="success"
            onClick={handleModalClosed}
            fullWidth
          >
            No
          </Button>
        </Grid>
      </Grid>
    </MUIModal>
  );
}

export default DeleteCandyModal;