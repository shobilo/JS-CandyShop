import { Button, ButtonGroup, Card, CardMedia, Container, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { useCallback } from 'react'
import PropTypes from "prop-types";

import DefaultCandy from "../../../static/images/DefaultCandy.svg"
import { getImage } from '../../../utils/getImage'

const CandyMediaOrder = (props) => {
  const { imageData, imageName } = props

  const [candiesCount, setCandiesCount] = useState(1)

  const imageSrc = getImage(imageData?.data, DefaultCandy)
  const isAllowedToDecrement = candiesCount === 1;

  const handleIncrement = useCallback(() => {
    setCandiesCount(candiesCount + 1)
  }, [candiesCount])

  const handleDecrement = useCallback(() => {
    setCandiesCount(candiesCount - 1)
  }, [candiesCount])

  return (
    <Container >
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardMedia
            component="img"
            height={400}
            image={imageSrc}
            alt={imageName}
          />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button 
              onClick={handleDecrement}
              disabled={isAllowedToDecrement}
              >-
              </Button>

              <Button disabled>{candiesCount}</Button>

              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </Paper>
          
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            color='success'
          >
            To Basket
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CandyMediaOrder

CandyMediaOrder.propTypes = {
  imageName: PropTypes.string,
  imageData: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.array
  })
}

CandyMediaOrder.defaultProps = {
  imageName: "No image",
  imageData: null
}