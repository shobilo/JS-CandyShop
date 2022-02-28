import React from "react"
import { useField } from 'formik'
import { TextField } from "@mui/material"
import PropTypes from 'prop-types'

const MUIDatePicker = (props) => {
  const {name, ...otherProps} = props

  const [field, meta] = useField(name)

  const configDatePicker = {
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true
    },
    ...field,
    ...otherProps,
  }

  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true
    configDatePicker.helperText = meta.error
  }

  return (
    <TextField 
      {...configDatePicker}
    />
  )
}

export default MUIDatePicker

MUIDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  otherProps: PropTypes.arrayOf(
    PropTypes.string
  )
}

MUIDatePicker.defaultProps = {
  otherProps: []
}

