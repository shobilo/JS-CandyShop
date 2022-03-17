import { Button, ButtonGroup, Container, Paper, Typography } from "@mui/material";
import React, { useCallback } from "react";
import PropTypes from "prop-types";

const CRUDTypes = [
  "CANDIES",
  "TYPES",
  "BRANDS"
]

const CRUDChoice = (props) => {
  const {setCurrentCRUD} = props

  const handleButtonClicked = useCallback((event) => {
    setCurrentCRUD(event.target.innerText)
  }, [setCurrentCRUD])

  return (
    <Container>
      <Paper sx={{padding: "1em"}}>
        <Typography variant="h5">Open Crud's</Typography>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="outlined"
          color="secondary"
          fullWidth
        >
          {CRUDTypes.map((name, index) => (
            <Button
              key={index}
              onClick={handleButtonClicked}
            >
              {name}
          </Button>
          ))}
        </ButtonGroup>
      </Paper>
      
    </Container>
  );
};

export default CRUDChoice;

CRUDChoice.propTypes = {
  setCurrentCRUD: PropTypes.func.isRequired
}
