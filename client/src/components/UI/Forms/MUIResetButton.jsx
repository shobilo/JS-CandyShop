import React from 'react'
import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import { useCallback } from 'react'
import PropTypes from 'prop-types'

const MUIResetButton = (props) => {
  const {children, ...otherProps} = props

  const { resetForm } = useFormikContext()


  const handleReset = useCallback(() => {
    resetForm()
  }, [resetForm])

  const configButton = {
    variant: 'contained',
    color: 'error',
    fullWidth: true,
    onClick: handleReset,
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

export default MUIResetButton

MUIResetButton.propTypes = {
  children: PropTypes.string,
}

MUIResetButton.defaultProps = {
  children: 'button',
}
