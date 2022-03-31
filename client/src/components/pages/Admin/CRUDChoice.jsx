import {Container, Paper, Tab, Tabs, Typography} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CRUDTypes = [
  "CANDIES",
  "TYPES",
  "BRANDS",
  "PROPERTIES"
]

const CRUDChoice = (props) => {
  const {currentCRUD, handleCRUDChanged} = props
  
  return (
    <Container maxWidth="xl">
      <Paper sx={{padding: "1em"}}>
        <Typography variant="h5">Open Crud's</Typography>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
          value={currentCRUD}
          onChange={handleCRUDChanged}
          aria-label="Vertical tabs"
          sx={{borderRight: 1, borderColor: 'divider'}}
        >
          {CRUDTypes.map((name, index) => (
            <Tab
              key={index}
              label={name}
              value={name}
            />
          ))}
        </Tabs>
      </Paper>
    
    </Container>
  );
};

export default CRUDChoice;

CRUDChoice.propTypes = {
  handleCRUDChanged: PropTypes.func.isRequired,
  currentCRUD: PropTypes.string.isRequired
}
