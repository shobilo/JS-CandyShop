import React, {useCallback, useRef} from "react"
import { useField, useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { Input } from "@mui/material"

const FormInputFile = (props) => {
  const imageRef = useRef();
  const {name, ...otherProps} = props

  const meta = useField(name)[1]
  const { setFieldValue } = useFormikContext()

  const handleChange = useCallback(async (event) => {
    const file = event.target.files[0]
    const objectURl = URL.createObjectURL(file)
    setFieldValue(name, file)
    imageRef.current.src = objectURl
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
      <img ref={imageRef} src="" height="200" alt="preview..."/>
    </>
  )
}

export default FormInputFile

FormInputFile.propTypes = {
  name: PropTypes.string.isRequired,
}
