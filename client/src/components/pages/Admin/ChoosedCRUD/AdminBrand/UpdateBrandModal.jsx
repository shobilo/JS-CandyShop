import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux"
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MUIModal from "../../../../UI/MUIModal";
import MUITextfield from "../../../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../../../UI/Forms/MUISubmitButton";
import { updateBrand } from "../../../../../redux/features/filtersData/filtersDataActionCreators";

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string('Must be a string')
    .min(3, 'Min value is 3')
    .max(20, 'Max value is 20')
    .required('Required'),
})

const UpdateBrandModal = ({ brand, modalState, handleModalClosed }) => {
  const dispatch = useDispatch()
  const {id, name} = brand

  const INITIAL_FORM_STATE = {
    name: name,
  }  

  const onFormSubmit = useCallback((values) => {
    dispatch(updateBrand({...values, id}))
    .unwrap()
    .then(() => {
      handleModalClosed()
    })
    .catch(error => {
      alert(error)
    })
  }, [dispatch, handleModalClosed, id])

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
                  Update Brand
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <MUITextfield 
                  name="name"
                  label="Name"
                  required
                />
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
};

export default UpdateBrandModal;

UpdateBrandModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
  brand: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}