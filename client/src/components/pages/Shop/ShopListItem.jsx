import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { getAverageValue } from "../../../utils/getAverageValue";

import DefaultCandy from "../../../static/images/DefaultCandy.svg";
import ClearLink from "../../UI/ClearLink";
import { getImage } from "../../../utils/getImage";
import MUIRating from "../../UI/MUIRating";

const ShopListItem = ({ candy }) => {
  const { id, brand, name, type, price, ratings, imageName, imageData } = candy;
  let rating = 0;

  const imageSrc = getImage(imageData.data, DefaultCandy)

  if (ratings.length > 0) {
    const ratingsArray = ratings.map((rating) => rating.rating);
    rating = getAverageValue(ratingsArray);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <ClearLink to={`/candy/${id}`}>
        <CardMedia
          component="img"
          height={120}
          image={imageSrc}
          alt={imageName}
        />
      </ClearLink>
      
      <CardContent>
        <ClearLink to={`/candy/${id}`}>
          <Typography gutterBottom variant="h4" component="div">
            {name}
          </Typography>
        </ClearLink>

        <Typography variant="subtitle1">
          {"Brand : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline">
              {brand.name}
            </Typography>
          </span>
        </Typography>
        <Typography variant="subtitle1">
          {"Type : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline">
              {type.name}
            </Typography>
          </span>
        </Typography>
        <Typography variant="subtitle1">
          {"Price : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline">
              {price} RUB
            </Typography>
          </span>
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Rating
        </Typography>
        <MUIRating 
          id={id}
          rating={rating}
        />
      </CardActions>
    </Card>
  );
};

export default ShopListItem;

ShopListItem.propTypes = {
  candy: PropTypes.object,
};

ShopListItem.defaultProps = {
  candy: {
    brand: { name: "No brand" },
    imageData: { data: DefaultCandy },
    imageName: "No image",
    name: "No name",
    price: "No price",
    ratings: [],
    type: { name: "No type" },
  },
};
