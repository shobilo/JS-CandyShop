import React from 'react'
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ClearLink from "../../UI/ClearLink";

const ErrorPage = (props) => {
  const {errorMessage, resetError} = props
  
  return (
    <Container maxWidth="lg" sx={{padding: "5rem"}}>
      <Paper sx={{padding: "2rem"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              {errorMessage || "Some error has occurred"}
            </Typography>
          </Grid>
          <Grid item xs={12} padding="2rem">
            <ClearLink to="/">
              <Button
                fullWidth
                variant="contained"
                onClick={resetError}
              >
                Return to home
              </Button>
            </ClearLink>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

ErrorPage.propTypes = {
  errorMessage: PropTypes.string,
  resetError: PropTypes.func
}

ErrorPage.defaultProps = {
  errorMessage: "Some error has occured",
  resetError: function() {return true}
}

export default ErrorPage
