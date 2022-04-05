import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux"
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MUIModal from "../../../../UI/MUIModal";
import MUITextfield from "../../../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../../../UI/Forms/MUISubmitButton";
import { createType } from "../../../../../redux/features/filtersData/filtersDataActionCreators";

const INITIAL_FORM_STATE = {
  name: '',
}

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string('Must be a string')
    .min(3, 'Min value is 3')
    .max(20, 'Max value is 20')
    .required('Required'),
})

const AddTypeModal = ({ modalState, handleModalClosed }) => {
  const dispatch = useDispatch()

  const onFormSubmit = useCallback((values) => {
    dispatch(createType(values))
    .unwrap()
    .then(() => {
      handleModalClosed()
    })
    .catch(error => {
      console.error(error)
    })
  }, [dispatch, handleModalClosed])

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
                  Add Type Form
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

export default AddTypeModal;

AddTypeModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
}