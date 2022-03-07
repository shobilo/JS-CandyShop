import { Card, CardActions, CardContent, CardMedia, Typography, Rating } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'

import DefaultCandy from './DefaultCandy.svg'

const ShopListItem = ({candy}) => {
  const { brand, name, type, price, ratings, imageName, imageData } = candy

  const imageSrc = imageData.data.toString('base64');

  // const [imageSrc, setImageSrc] = useState(null)
  
  // const imageSrc = imageData.data.toString('base64')
  // const imageSrc = btoa(String.fromCharCodenull(...new Uint8Array(imageData.data)))

  // const handleRatingChanged = useCallback((event, newValue) => {
  //   setRatingValue(newValue)
  // }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height={120}
        // src={`data:image/png;base64,${imageSrc}`}
        // src={imageSrc}
        image={imageSrc}
        alt={imageName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Mega candy for you and only you
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: "center"}}>
        <Typography variant="body2" color="text.secondary">
          Rating
        </Typography>
        <Rating 
          // value={ratingValue}
          // onChange={handleRatingChanged}
        />
      </CardActions>
    </Card>
  )
}

export default ShopListItem

ShopListItem.propTypes = {
  candy: PropTypes.object
}

ShopListItem.defaultProps = {
  candy: {
    brand: {name: "No brand"},
    imageData: {data: DefaultCandy},
    imageName: "No image",
    name: "No name",
    price: "No price",
    ratings: [],
    type: {name: "No type"}
  }
}