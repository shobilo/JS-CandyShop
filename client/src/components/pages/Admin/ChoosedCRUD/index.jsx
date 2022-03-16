import { Container, Paper, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import PropTypes from "prop-types";
import AdminBrand from './AdminBrand'
import AdminCandy from './AdminCandy'
import AdminType from './AdminType'

const ChoosedCRUD = (props) => {
  const {currentCRUD} = props

  const getCRUDPage = useCallback((currentCRUD) => {
    switch (currentCRUD) {
      case 'CANDIES':
        return <AdminCandy />
      case 'TYPES':
        return <AdminType />
      case 'BRANDS':
        return <AdminBrand />
      default: 
        return (
        <Typography
          variant='h5'
        >
          Choose CRUD
        </Typography>
        )
    }
  }, [])

  const CrudContent = getCRUDPage(currentCRUD)

  return (
    <Container>
      <Paper sx={{padding: "1em"}}>
        {CrudContent}
      </Paper>
    </Container>
  )
}

export default ChoosedCRUD

ChoosedCRUD.propTypes = {
  currentCRUD: PropTypes.string.isRequired
}