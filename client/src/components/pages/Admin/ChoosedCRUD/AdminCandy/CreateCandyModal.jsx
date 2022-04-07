import { CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MUIModal from "../../../../UI/MUIModal";
import MUITextfield from "../../../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../../../UI/Forms/MUISubmitButton";
import { readAllFiltersData } from "../../../../../redux/features/filtersData/filtersDataActionCreators";
import FormSelect from "../../../../UI/Forms/FormSelect";
import { resetFiltersData } from "../../../../../redux/features/filtersData/filtersDataSlice";
import FormInputFile from "../../../../UI/Forms/FormInputImage";
import FormErrorMessage from "../../../../UI/Forms/FormErrorMessage";
import { createCandy } from "../../../../../redux/features/candies/candiesActionCreators";
import { getStringifiedObjectOrBase } from "../../../../../utils/getStringifiedObjectOrBase";
import FormMultiSelectChip from "../../../../UI/Forms/FormMultiSelectChip";

const INITIAL_FORM_STATE = {
  name: '',
  price: '',
  typeId: '',
  brandId: '',
  image: '',
  properties: [],
}

const SUPPORTED_IMAGE_FORMATS = ["image/png"]

const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Min value is 3')
    .max(20, 'Max value is 20')
    .required('Required'),
  price: Yup.number('Only numbers')
    .moreThan(0)
    .required('Required'),
  typeId: Yup.number()
    .moreThan(0)
    .required('Required'),
  brandId: Yup.number()
    .moreThan(0)
    .required('Required'),
  properties: Yup.array(),
  image: Yup
    .mixed()
    .nullable()
    .test("FILE_SIZE", "Uploaded file is too big", (value) => !value || (value && (value.size <= 1024 * 1024)))
    .test("FILE_FORMAT", "Uploaded file has unsupported format", (value) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value?.type)))
})

const CreateCandyModal = ({ modalState, handleModalClosed }) => {
  const dispatch = useDispatch()

  const { types, brands, properties, isLoading } = useSelector(
    (state) => state.filtersData
  );

  useEffect(() => {
    dispatch(readAllFiltersData())
      .unwrap()
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch(resetFiltersData())
  }, [dispatch])

  const onFormSubmit = useCallback((values) => {
    const formData = new FormData()

    for (const key in values) {
      formData.append(key, getStringifiedObjectOrBase(values[key]))
    }

    dispatch(createCandy(formData))
    .unwrap()
    .then(() => {
      handleModalClosed()
    })
    .catch(() => {})
    
  }, [dispatch, handleModalClosed])

  if (isLoading) {
    return (
      <Container>
        <Paper>
          <Grid container direction="column" alignItems="flex-start" spacing={2}>
            
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

              {isLoading ? (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>) : (<></>)}

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
                  name="typeId"
                  label="Type"
                  options={types}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormSelect
                  name="brandId"
                  label="Brand"
                  options={brands}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormMultiSelectChip
                  name="properties"
                  label="Properties"
                  options={properties}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormInputFile 
                  name="image"
                  inputProps={{accept: "image/png"}}
                />
                <FormErrorMessage name="image"/>
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

export default CreateCandyModal;

CreateCandyModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
}