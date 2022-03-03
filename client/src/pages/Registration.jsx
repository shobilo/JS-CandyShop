import React from 'react';
import { Formik, Form } from 'formik';
import { Grid, Container ,Typography } from '@mui/material';
import * as Yup from 'yup'
import { useCallback } from 'react';
import { useDispatch } from 'react-redux'

import MUITextfield from '../components/UI/Forms/MUITextfield';
import MUIDatePicker from '../components/UI/Forms/MUIDatePicker';
import MUISubmitButton from '../components/UI/Forms/MUISubmitButton';
import MUIResetButton from '../components/UI/Forms/MUIResetButton';
import { useNavigate } from 'react-router-dom';
import { registration } from '../redux/features/user/userActionCreators';


const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  phone: '',
  name: '',
  surname: '',
  birthDate: '',
  address: '',
}

const phoneRegExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Min value is 6')
    .max(32, 'Max value is 32')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Min value is 2')
    .max(30, 'Max value is 30')
    .required('Required'),
  surname: Yup.string()
    .min(2, 'Min value is 2')
    .max(30, 'Max value is 30')
    .required('Required'),
  birthDate: Yup.date()
    .min('1900', 'Min year is 1900')
    .max(new Date(), 'You can not be born in the future'),
  address: Yup.string()
  .min(8, 'Min value is 8')
  .max(64, 'Max value is 64'),
  phone: Yup.string()
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('Required'),
})

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