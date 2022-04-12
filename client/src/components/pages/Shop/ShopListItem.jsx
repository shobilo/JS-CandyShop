import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import DefaultCandy from "../../../static/images/DefaultCandy.svg";
import ClearLink from "../../UI/ClearLink";
import {getImage} from "../../../utils/getImage";
import MUIRating from "../../UI/MUIRating";
import {getTitleCase} from "../../../utils/getTitleCase";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBasketCandies, updateBasketCandies} from "../../../redux/features/basket/basketActionCreators";

const ShopListItem = (props) => {
  const dispatch = useDispatch()
  const {id, brand, name, type, price, averageRating, imageName, imageData} = props?.candy;
  const {candies: basketCandies} = useSelector((state) => state.basket)
  
  const isCandyInBasket = basketCandies?.filter(({candy}) => candy.id === id)?.length !== 0
  const imageSrc = getImage(imageData?.data, DefaultCandy)
  
  const handleAddClicked = useCallback(() => {
    dispatch(updateBasketCandies({
      candyId: id,
      quantity: 1
    }))
      .unwrap()
      .then()
      .catch(() => {})
  }, [dispatch, id])
  
  const handleDelete = useCallback(() => {
    dispatch(deleteBasketCandies({candyId: id}))
      .unwrap()
      .catch(() => {})
  }, [dispatch, id])
  
  return (
    <Card sx={{maxWidth: 345, borderRadius: "1rem"}}>
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
        
        <div>
          <div style={{margin: "0rem 0rem -1rem 0rem"}}>
            <ClearLink to={`/candy/${id}`}>
              <Typography gutterBottom variant="h4" component="div">
                {getTitleCase(name)}
              </Typography>
            </ClearLink>
          </div>
          <div style={{margin: "0rem 0rem 0.5rem 0rem"}}>
            <MUIRating
              id={id}
              rating={averageRating}
            />
          </div>
        </div>
        
        
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
      <CardActions sx={{justifyContent: "center"}}>
        {isCandyInBasket ? (
          <Button
            onClick={handleDelete}
            variant='contained'
            color="neutral"
          >
            Already in basket
          </Button>
        ) : (
          <Button
            onClick={handleAddClicked}
            variant='contained'
            color="success"
          >
            Add to basket
          </Button>
        )}
        
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
    brand: {name: "No brand"},
    imageData: {data: DefaultCandy},
    imageName: "No image",
    name: "No name",
    price: "No price",
    ratings: [],
    type: {name: "No type"},
  },
};
