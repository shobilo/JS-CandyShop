import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'
import PropTypes from 'prop-types'

const ClearLink = (props) => {
  const { to, children } = props

  return (
    <Link
      component={RouterLink}
      underline="none"
      color="black"
      to={to}
      >
        {children}
    </Link>
  )
}

ClearLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

ClearLink.defaultProps = {
  children: null
}

export default ClearLink