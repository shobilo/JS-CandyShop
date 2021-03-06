import React from 'react'
import PropTypes from "prop-types";
import { Container, Grid, Paper, Typography } from '@mui/material';
import MUIRating from '../../UI/MUIRating';


const CandyInfo = (props) => {
  const {id, brand, name, price, properties, averageRating, type} = props

  return (
    <Container maxWidth="xl">
      <Paper sx={{borderRadius: "2rem"}}>
        <Grid container spacing={1} sx={{padding: "0.5em", marginTop: "0"}}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="span"
            >
              {name.toUpperCase()}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Rating
            </Typography>

            <MUIRating 
              id={id} 
              rating={averageRating}
            />

          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" color="red">
              {`${price} RUB`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} sx={{padding: "1em 0 1em 0"}}>
              <Grid item xs={12}>
                <Typography variant="button">
                {"Brand : "}
                <span>
                  <Typography variant="h6" color="text.primary" display="inline">
                    {brand?.name}
                  </Typography>
                </span>
              </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button">
                {"Type : "}
                <span>
                  <Typography variant="h6" color="text.primary" display="inline">
                    {type?.name}
                  </Typography>
                </span>
              </Typography>
              </Grid>
            </Grid>
            
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>
              Properties
            </Typography>
              {properties?.map((property, index) => (
                <Typography
                  component="div"
                  variant='button'
                  key={property.id}
                  sx={{marginTop:"10px"}}
                >
                  {`${index + 1}. ${property.name} : ${property.description}`}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default CandyInfo

CandyInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  brand: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  type: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  averageRating: PropTypes.number,
  properties: PropTypes.arrayOf(
    PropTypes.object
  )
}

CandyInfo.defaultProps = {
  name: 'No name',
  price: 0,
  brand: {
    name: 'No brand',
    id: '0',
  },
  type: {
    name: 'No type',
    id: '0',
  },
  averageRating: 0,
  properties: []
}