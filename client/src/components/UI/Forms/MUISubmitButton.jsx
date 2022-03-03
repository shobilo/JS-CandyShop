import React from 'react'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { useCallback } from 'react'
import PropTypes from 'prop-types'

const MUISubmitButton = (props) => {
  const {children, ...otherProps} = props

  const { submitForm } = useFormikContext()


  const handleSubmit = useCallback(() => {
    submitForm()
  }, [submitForm])

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: handleSubmit,
    ...otherProps,
  }


  return (
    <Button
      {...configButton}
    >
      {children}
    </Button>
  )
}

export default MUISubmitButton

MUISubmitButton.propTypes = {
  children: PropTypes.string,
}

MUISubmitButton.defaultProps = {
  children: 'button',
}

