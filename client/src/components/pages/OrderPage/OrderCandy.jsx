import React from "react"
import {Card, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import {getImage} from "../../../utils/getImage";
import DefaultCandy from "../../../static/images/DefaultCandy.svg";
import {getPrettyPrice} from "../../../utils/getPrettyPrice";
import {getTitleCase} from "../../../utils/getTitleCase";

const OrderCandy = ({candy, quantity}) => {
  const {name, price, imageName, imageData} = candy
  const imageSrc = getImage(imageData?.data, DefaultCandy)
  
  return (
    <Card>
      <CardHeader title={getTitleCase(name)} />
      <CardMedia
        sx={{padding: "1em", borderRadius: "15em"}}
        component="img"
        height={100}
        image={imageSrc}
        alt={imageName}
      />
      <CardContent>
        <Typography>
          Price: {price}
        </Typography>
        <Typography>
          Quantity: {quantity}
        </Typography>
        <Typography fontWeight="bold">
          Total price: {getPrettyPrice(price, quantity)} RUB
        </Typography>
      </CardContent>
    </Card>
  )
}

export default OrderCandy