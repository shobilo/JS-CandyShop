import React from "react"
import { TextField } from "@mui/material"
import { useField } from 'formik'
import PropTypes from 'prop-types'

const MUITextfield = (props) => {
  const { name, ...otherProps } = props
  const [field, meta] = useField(name)

  const configTextfield = {
    fullWidth: true,
    variant: 'outlined',
    ...otherProps,
    ...field
  }

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true
    configTextfield.helperText = meta.error
  }

  return (
    <TextField {...configTextfield}/>
  )
}

export default MUITextfield

MUITextfield.propTypes = {
  name: PropTypes.string.isRequired,
}
