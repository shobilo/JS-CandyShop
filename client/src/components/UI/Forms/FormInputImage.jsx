import React, { useCallback } from "react"
import { useField, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { Input } from "@mui/material"

const FormInputFile = (props) => {
  const {name, ...otherProps} = props

  const meta = useField(name)[1]
  const { setFieldValue } = useFormikContext()

  const handleChange = useCallback((event) => {
    const file = event.target.files[0]
    setFieldValue(name, file)
  }, [name, setFieldValue])

  const configInput = {
    type: "file",
    onChange: handleChange,
    ...otherProps,
  }

  if (meta && meta.touched && meta.error) {
    configInput.error = true
  }

  return (
    <>
      <Input
        {...configInput}
      />
    </>
  )
}

export default FormInputFile

FormInputFile.propTypes = {
  name: PropTypes.string.isRequired,
}
