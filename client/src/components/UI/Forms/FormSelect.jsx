import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import PropTypes from 'prop-types'
import { useField } from 'formik'
import { getTitleCase } from '../../../utils/getTitleCase'

const FormSelect = (props) => {
  const {name, options, ...otherProps} = props

  const [field, meta] = useField(name)

  const configSelect = {
    select: true,
    variant: 'outlined',
    fullWidth: true,
    ...field,
    ...otherProps,
  }

  if (meta && meta.touched && meta.error) {
    configSelect.error = true
    configSelect.helperText = meta.error
  }

  return (
    <TextField {...configSelect}>
      {options.map((option) => (
        <MenuItem 
          key={option?.id} 
          value={option?.id}>
            {getTitleCase(option?.name)}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default FormSelect

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
}