import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Container ,Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_STATE } from './formValidation'
import MUITextfield from '../../UI/Forms/MUITextfield';
import MUIDatePicker from '../../UI/Forms/MUIDatePicker';
import MUISubmitButton from '../../UI/Forms/MUISubmitButton';
import MUIResetButton from '../../UI/Forms/MUIResetButton';
import { useNavigate } from 'react-router-dom';
import { registration } from '../../../redux/features/user/userActionCreators';

const Registration = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFormSumbit = useCallback(async (values) => {
    dispatch(registration(values))
    .unwrap()
    .then(() => {
      navigate("/")
    })
    .catch((error) => {
      alert(error.message)
    })
  }, [dispatch, navigate])

  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={onFormSumbit}
      
      >
        <Form>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <Typography variant="h4">
                Registration form
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Authentication information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <MUITextfield 
                name="email"
                label="Email"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <MUITextfield 
                name="password"
                label="Password"
                type="password"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">
                Personal information
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <MUITextfield 
                name="name"
                label="First name"
                required
              />
            </Grid>

            <Grid item xs={6}>
              <MUITextfield 
                name="surname"
                label="Second Name"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <MUITextfield 
                name="phone"
                label="Phone Number"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <MUITextfield 
                name="address"
                label="Address line"
              />
            </Grid>

            <Grid item xs={12}>
              <MUIDatePicker 
                name="birthDate"
                label="Your Birth date"
              />
            </Grid>

            <Grid item xs={6}>
              <MUISubmitButton>
                Submit
              </MUISubmitButton>
            </Grid>

            <Grid item xs={6}>
              <MUIResetButton>
                Reset
              </MUIResetButton>
            </Grid>

          </Grid>

        </Form>
      </Formik>
    </Container>
  )
}

export default Registration