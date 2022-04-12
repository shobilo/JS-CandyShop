import React, {useState} from 'react';
import {Container, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {getPrettyDate} from "../../../utils/getPrettyDate";

const getSteps = (deliveryStartDate, deliveryProcessDate, deliveryEndDate) => {
  return [
    {
      label: `Ordered`,
      description: `You have ordered our item(s) and now you have to wait until the order will be handled by our manager's`,
      date: getPrettyDate(deliveryStartDate)
    },
    {
      label: `In process`,
      description: `Your order has been handled and now on the way to you!`,
      date: getPrettyDate(deliveryProcessDate)
    },
    {
      label: `Delivered`,
      description: `Successfully delivered. Have a nice time and thank you for your order!`,
      date: getPrettyDate(deliveryEndDate)
    }
  ]
}

const getActiveStep = (...dates) => {
  for (let i = dates.length - 1; i >= 0; i--) {
    if (dates[i]) {
      return i
    }
  }
  return 0
}

const OrderDeliveryState = ({details}) => {
  const {deliveryStartDate, deliveryProcessDate, deliveryEndDate} = details
  
  const active = getActiveStep(deliveryStartDate, deliveryProcessDate, deliveryEndDate)
  const steps = getSteps(deliveryStartDate, deliveryProcessDate, deliveryEndDate)
  
  const [activeStep] = useState(active)
  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Delivery State
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stepper orientation="vertical" activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  step.date !== "No date" ? (
                    <Typography variant="caption">{step.date}</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Container>
  );
};

OrderDeliveryState.propTypes = {
  details: PropTypes.shape({
    deliveryStartDate: PropTypes.string,
    deliveryProcessDate: PropTypes.string,
    deliveryEndDate: PropTypes.string
  })
}

OrderDeliveryState.defaultProps = {
  details: {
    deliveryStartDate: "no data",
    deliveryProcessDate: "no data",
    deliveryEndDate: "no data"
  }
}

export default OrderDeliveryState;

