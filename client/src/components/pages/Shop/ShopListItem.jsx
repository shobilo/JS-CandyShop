import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import DefaultCandy from "../../../static/images/DefaultCandy.svg";
import ClearLink from "../../UI/ClearLink";
import { getImage } from "../../../utils/getImage";
import MUIRating from "../../UI/MUIRating";
import { getTitleCase } from "../../../utils/getTitleCase";

const ShopListItem = (props) => {
  const { id, brand, name, type, price, averageRating, imageName, imageData } = props?.candy;

  const imageSrc = getImage(imageData?.data, DefaultCandy)

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "1rem"}}>
      <ClearLink to={`/candy/${id}`}>
        <CardMedia
          sx={{padding: "1em", borderRadius: "15em"}}
          component="img"
          height={120}
          image={imageSrc}
          alt={imageName}
        />
      </ClearLink>
      
      <CardContent>
        <ClearLink to={`/candy/${id}`}>
          <Typography gutterBottom variant="h4" component="div">
            {getTitleCase(name)}
          </Typography>
        </ClearLink>

        <Typography variant="subtitle1">
          {"Brand : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline">
              {getTitleCase(brand?.name)}
            </Typography>
          </span>
        </Typography>
        <Typography variant="subtitle1">
          {"Type : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline">
              {getTitleCase(type?.name)}
            </Typography>
          </span>
        </Typography>
        <Typography variant="subtitle1">
          {"Price : "}
          <span>
            <Typography variant="h6" color="text.primary" display="inline" fontWeight="bold">
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
          rating={averageRating}
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
