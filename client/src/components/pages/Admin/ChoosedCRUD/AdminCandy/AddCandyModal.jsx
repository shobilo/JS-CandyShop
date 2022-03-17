import { CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MUIModal from "../../../../UI/MUIModal";
import MUITextfield from "../../../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../../../UI/Forms/MUISubmitButton";
import MUIResetButton from "../../../../UI/Forms/MUIResetButton";
import { readAllFiltersData } from "../../../../../redux/features/filtersData/filtersDataActionCreators";
import FormSelect from "../../../../UI/Forms/FormSelect";
import { resetFiltersData } from "../../../../../redux/features/filtersData/filtersDataSlice";

const INITIAL_FORM_STATE = {
  name: '',
  price: '',
  type: '',
  brand: '',
  image: null,
  properties: [],
}

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Min value is 3')
    .max(20, 'Max value is 20')
    .required('Required'),
  price: Yup.number('Only numbers')
    .moreThan(0)
    .required('Required'),
  type: Yup.number()
    .moreThan(0)
    .required('Required'),
  brand: Yup.number()
    .moreThan(0)
    .required('Required'),
  properties: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .min(3, 'Min value is 3')
        .max(20, 'Max value is 20'),
      description: Yup.string()
        .min(3, 'Min value is 3')
        .max(20, 'Max value is 20')
    })
  )
})

const AddCandyModal = ({ modalState, handleModalClosed }) => {
  const dispatch = useDispatch()

  const { types, brands, isLoading } = useSelector(
    (state) => state.filtersData
  );

  useEffect(() => {
    dispatch(readAllFiltersData())
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(resetFiltersData())
  }, [])

  const onFormSubmit = useCallback((values) => {
    
  }, [])

  if (isLoading) {
    return (
      <Container>
        <Paper>
          <Grid container direction="column" alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
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
                  Add Candy Form
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
                  name="price"
                  label="Price"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormSelect
                  name="type"
                  label="Type"
                  options={types}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormSelect
                  name="brand"
                  label="Brand"
                  options={brands}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <input type={"file"}></input>
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
    </MUIModal>
  );
};

export default AddCandyModal;

AddCandyModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
}