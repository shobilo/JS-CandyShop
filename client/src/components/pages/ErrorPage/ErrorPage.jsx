import React from 'react'
import {Button, Container, Grid, Paper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ClearLink from "../../UI/ClearLink";

const ErrorPage = (props) => {
  const {errorInfo} = props
  return (
    <Container maxWidth="lg">
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              ErrorInfo: {errorInfo || "Some error has occured"}
            </Typography>
          </Grid>
          <Grid item xs={12} padding="2rem">
            <ClearLink to="/">
              <Button
                fullWidth
                variant="contained"
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
  errorInfo: PropTypes.shape({componentStack: PropTypes.string})
}

export default ErrorPage
