import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeCandyRating } from "../../../redux/features/candies/candiesActionCreators";
import { bytesBufferToBase64 } from "../../../utils/byteArrayToBase64";
import { getAverageValue } from "../../../utils/getAverageValue";

import DefaultCandy from "../../../static/images/DefaultCandy.svg";
import ClearLink from "../../UI/ClearLink";

const ShopListItem = ({ candy }) => {
  const dispatch = useDispatch();

  const { id, brand, name, type, price, ratings, imageName, imageData } = candy;
  let rating = 0;
  let imageSrc = DefaultCandy;

  if (imageData) {
    const base64buffer = bytesBufferToBase64(imageData.data);
    imageSrc = `data:image/jpg;base64,${base64buffer}`;
  }

  if (ratings.length > 0) {
    const ratingsArray = ratings.map((rating) => rating.rating);
    rating = getAverageValue(ratingsArray);
  }

  const handleRatingChanged = useCallback((event, newValue) => {
    dispatch(changeCandyRating({ id, rating: newValue }))
      .unwrap()
      .catch((error) => {
        alert(error.message);
      });
  }, [dispatch, id]);

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
        <Rating value={rating} onChange={handleRatingChanged} />
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
