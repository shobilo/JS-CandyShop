import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Container, Typography, Paper } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { FORM_VALIDATION_SCHEMA, INITIAL_FORM_STATE } from './formValidation'
import MUITextfield from '../../UI/Forms/MUITextfield';
import MUISubmitButton from '../../UI/Forms/MUISubmitButton';
import MUIResetButton from '../../UI/Forms/MUIResetButton';
import { login } from '../../../redux/features/user/userActionCreators';


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFormSubmit = useCallback((values) => {
    dispatch(login(values))
    .unwrap()
    .then(() => {
      navigate("/")
    })
    .catch((error) => {
      alert( error )
    })
  }, [dispatch, navigate])

  return (
    <Container maxWidth="sm">
      <Paper>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE
          }}
          validationSchema={FORM_VALIDATION_SCHEMA}
          onSubmit={onFormSubmit}
        
        >
          <Form>

            <Grid container spacing={2} sx={{padding: "15px", marginTop: "0"}}>

              <Grid item xs={12}>
                <Typography variant="h4">
                  Login form
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
      </Paper>
    </Container>
  )
}

export default Login