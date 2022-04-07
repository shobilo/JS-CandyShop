import {CircularProgress, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux"
import {Formik, Form} from 'formik';
import * as Yup from 'yup'
import MUIModal from "../../../../UI/MUIModal";
import MUITextfield from "../../../../UI/Forms/MUITextfield";
import MUISubmitButton from "../../../../UI/Forms/MUISubmitButton";
import {readAllFiltersData} from "../../../../../redux/features/filtersData/filtersDataActionCreators";
import {resetFiltersData} from "../../../../../redux/features/filtersData/filtersDataSlice";
import {getStringifiedObjectOrBase} from "../../../../../utils/getStringifiedObjectOrBase";
import FormSelect from "../../../../UI/Forms/FormSelect";
import FormMultiSelectChip from "../../../../UI/Forms/FormMultiSelectChip";
import FormInputFile from "../../../../UI/Forms/FormInputImage";
import FormErrorMessage from "../../../../UI/Forms/FormErrorMessage";
import {updateCandy} from "../../../../../redux/features/candies/candiesActionCreators";
import DefaultCandy from "../../../../../static/images/DefaultCandy.svg";
import {getImage} from "../../../../../utils/getImage";

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
  properties: Yup
    .array(),
  image: Yup
    .mixed()
    .nullable()
    .test("FILE_SIZE", "Uploaded file is too big", (value) => !value || (value && (value.size <= 1024 * 1024)))
    .test("FILE_FORMAT", "Uploaded file has unsupported format", (value) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value?.type)))
})

const UpdateCandyModal = ({candy, modalState, handleModalClosed}) => {
  const dispatch = useDispatch()
  
  const {id, name, price, brand, type, imageName, imageData, properties: candyProperties} = candy
  
  const imageSrc = getImage(imageData?.data, DefaultCandy)
  const [formikImage, setFormikImage] = useState("")
  
  const {types, brands, properties, isLoading} = useSelector(
    (state) => state.filtersData
  );
  
  const INITIAL_FORM_STATE = {
    name: name,
    price: price,
    typeId: type?.id,
    brandId: brand?.id,
    image: '',
    properties: candyProperties,
  }
  
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
    
    formData.append("id", id)
    for (const key in values) {
      formData.append(key, getStringifiedObjectOrBase(values[key]))
    }
    
    dispatch(updateCandy({id, formData}))
      .unwrap()
      .then(() => {
        handleModalClosed()
      })
      .catch(() => {})
  }, [dispatch, handleModalClosed, id])
  
  const handleImageChanged = useCallback((formikActions) =>
    (formikActions
      ? setFormikImage(formikActions.values?.image)
      : setFormikImage("")), [])
  
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
        innerRef={handleImageChanged}
      >
        <Form>
          
          <Grid container spacing={2} sx={{padding: "15px"}}>
            
            {isLoading ? (
              <Grid item xs={12}>
                <CircularProgress/>
              </Grid>) : (<></>)}
            
            <Grid item xs={12}>
              <Typography variant="h4">
                Update Candy
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
            
            {
              (formikImage) ? null : (
                <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                  <img
                    src={imageSrc}
                    alt={imageName}
                    height={140}
                  >
                  </img>
                </Grid>
              )}
            
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

export default UpdateCandyModal;

UpdateCandyModal.propTypes = {
  candy: PropTypes.object.isRequired,
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
}