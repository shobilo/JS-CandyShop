import React from 'react';
import {Container, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";

const OrderDetails = ({details}) => {
  const {name, surname, email, address, phone} = details
  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Customer details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            {`Name: ${name}`}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
          <Typography>
            {`Surname: ${surname}`}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
          <Typography>
            {`Email: ${email}`}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
          <Typography>
            {`Address: ${address}`}
          </Typography>
        </Grid>
  
        <Grid item xs={12}>
          <Typography>
            {`Phone: ${phone}`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

OrderDetails.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string
  })
}

OrderDetails.defaultProps = {
  details: {
    name: "no name",
    surname: "no surname",
    email: "no email",
    address: "no address",
    phone: "no phone"
  }
}

export default OrderDetails;