import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Container, Typography } from '@mui/material';
import * as Yup from 'yup'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import MUITextfield from '../components/UI/Forms/MUITextfield';
import MUISubmitButton from '../components/UI/Forms/MUISubmitButton';
import MUIResetButton from '../components/UI/Forms/MUIResetButton';
import { login } from '../redux/features/user/userActionCreators';


const INITIAL_FORM_STATE = {
  email: '',
  password: '',
}

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Min value is 6')
    .max(32, 'Max value is 32')
    .required('Required'),
})

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
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={onFormSubmit}
      
      >
        <Form>

          <Grid container spacing={2}>

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
    </Container>
  )
}

export default Login