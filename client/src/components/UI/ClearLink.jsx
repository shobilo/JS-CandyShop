import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ClearLink = ({to, children}) => {
  return (
    <Link 
      to={to}
      style={{ textDecoration: "none", color: "black" }}
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