import { Card, CardActions, CardContent, CardMedia, Typography, Rating } from '@mui/material'
import DefaultCandy from './DefaultCandy.svg'
import { useCallback, useState } from 'react'

const ShopListItem = () => {
  const [ratingValue, setRatingValue] = useState(0)

  const handleRatingChanged = useCallback((event, newValue) => {
    setRatingValue(newValue)
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height={120}
        src={DefaultCandy}
        alt="candy"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Candy
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
          value={ratingValue}
          onChange={handleRatingChanged}
        />
      </CardActions>
    </Card>
  )
}

export default ShopListItem