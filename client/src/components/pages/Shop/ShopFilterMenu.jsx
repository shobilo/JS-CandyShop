import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useState, useCallback } from 'react'
import MUISelect from '../../UI/MUISelect'

const ShopFilterMenu = () => {
  const [searchField, setSearchField] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selecterBrand, setSelectedBrand] = useState('')

  const handleSearchFieldChanged = useCallback((event) => {
    setSearchField(event.target.value)
  }, [])

  const handleTypesSelected = useCallback((event) => {
    setSelectedType(event.target.value)
  }, [])

  const handleBrandsSelected = useCallback((event) => {
    setSelectedBrand(event.target.value)
  }, [])


  return (
    <Container>
      <Grid 
        container
        direction="column"
        alignItems="flex-start"
        spacing={2} 
      >
        <Grid item xs={12}>
          <Typography
            variant='h6'
          >
            Search candy
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            sx={{minWidth: 150}}
            id="searchField"
            label="Search..."
            value={searchField}
            onChange={handleSearchFieldChanged}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant='h6'
          >
            Filters
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <MUISelect 
            value={selectedType}
            onChange={handleTypesSelected}
            label="Type"
            options={[
              { value: "chocolateBar", label: "Chocolate Bar" },
              { value: "candy", label: "Candy" },
            ]}
            isNone={true}
          />
        </Grid>

        <Grid item xs={12}>
        <MUISelect 
            value={selecterBrand}
            onChange={handleBrandsSelected}
            label="Brand"
            options={[
              { value: "snickers", label: "Snickers" },
              { value: "twix", label: "Twix" },
            ]}
            isNone={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Button 
            color="error" 
            variant='outlined'
            >
              Reset
          </Button>
        </Grid>

      </Grid>
    </Container>
    
  )
}

export default ShopFilterMenu