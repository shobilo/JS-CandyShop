import {Button, ButtonGroup, Card, CardMedia, Container, Grid, Paper, Typography} from '@mui/material'
import React, { useState } from 'react'
import { useCallback } from 'react'
import PropTypes from "prop-types";

import DefaultCandy from "../../../static/images/DefaultCandy.svg"
import { getImage } from '../../../utils/getImage'
import {useDispatch} from "react-redux";
import {updateBasketCandies} from "../../../redux/features/basket/basketActionCreators";

const CandyMediaOrder = (props) => {
  const { imageData, imageName, candyId} = props
  
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)

  const imageSrc = getImage(imageData?.data, DefaultCandy)
  const isAllowedToDecrement = quantity === 1;

  const handleIncrement = useCallback(() => {
    if (quantity < 20) {
      setQuantity(quantity + 1)
    }
  }, [quantity])

  const handleDecrement = useCallback(() => {
    setQuantity(quantity - 1)
  }, [quantity])
  
  const handleSubmitClicked = useCallback(() => {
    dispatch(updateBasketCandies({
      candyId,
      quantity
    }))
      .unwrap()
      .then()
      .catch((error) => {
        alert(error)
      })
    
    setQuantity(1)
  }, [candyId, quantity, dispatch])

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

              <Button disabled>
                <Typography fontWeight="normal" color="black">
                  {quantity}
                </Typography>
              </Button>

              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </Paper>
          
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleSubmitClicked}
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