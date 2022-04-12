import MUIModal from "../../UI/MUIModal";
import {useDispatch} from "react-redux";
import React, {useCallback} from "react";
import {Form, Formik} from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {Grid, Typography} from "@mui/material";
import MUITextfield from "../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../UI/Forms/MUISubmitButton";
import {orderBasketCandies} from "../../../redux/features/basket/basketActionCreators";


const phoneRegExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  name: Yup.string('Must be a string')
    .min(3, 'Min value is 3')
    .max(20, 'Max value is 20')
    .required('Required'),
  surname: Yup.string()
    .min(2, 'Min value is 2')
    .max(30, 'Max value is 30')
    .required('Required'),
  address: Yup.string()
    .min(8, 'Min value is 8')
    .max(64, 'Max value is 64')
    .required('Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Required'),
})

const BasketOrderModal = ({ modalState, handleModalClosed, user, totalPrice }) => {
  const dispatch = useDispatch()
  
  const onFormSubmit = useCallback((values) => {
    
    const valuesWithPrice = {
      ...values,
      totalPrice,
    }
  
    dispatch(orderBasketCandies(valuesWithPrice))
      .unwrap()
      .then(() => {
        handleModalClosed()
      })
      .catch(() => {})
  }, [dispatch, handleModalClosed, totalPrice])
  
  const INITIAL_FORM_STATE = {
    name: user?.name,
    surname: user?.surname,
    address: user?.address,
    phone: user?.phone,
    email: user?.email,
  }
  
  return (
    <MUIModal
      modalState={modalState}
      handleModalClosed={handleModalClosed}
    >
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION_SCHEMA}
        onSubmit={onFormSubmit}
      
      >
        <Form>
          
          <Grid container spacing={2} sx={{padding: "15px"}}>
            
            <Grid item xs={12}>
              <Typography variant="h4">
                Making order
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <MUITextfield
                name="name"
                label="Name"
                required
              />
            </Grid>
  
            <Grid item xs={12}>
              <MUITextfield
                name="surname"
                label="Surname"
                required
              />
            </Grid>
  
            <Grid item xs={12}>
              <MUITextfield
                name="phone"
                label="Phone"
                required
              />
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
                name="address"
                label="Address"
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography
                sx={{fontWeight: "bold"}}
                variant="h5"
              >
                Total price: {totalPrice} RUB
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
              <MUISubmitButton>
                Submit
              </MUISubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </MUIModal>
  );
}

export default BasketOrderModal

BasketOrderModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  totalPrice: PropTypes.number.isRequired,
}