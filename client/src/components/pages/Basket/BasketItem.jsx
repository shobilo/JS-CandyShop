import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  ButtonGroup, Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearLink from "../../UI/ClearLink";
import {getImage} from "../../../utils/getImage";
import DefaultCandy from "../../../static/images/DefaultCandy.svg"
import {getTitleCase} from "../../../utils/getTitleCase";
import {useDispatch} from "react-redux";
import {deleteBasketCandies, updateBasketCandies} from "../../../redux/features/basket/basketActionCreators";
import debounce from "lodash.debounce";
import {getPrettyPrice} from "../../../utils/getPrettyPrice";
import {getPrettyDate} from "../../../utils/getPrettyDate";
import InventoryIcon from "@mui/icons-material/Inventory";

const BasketItem = ({candy, quantity}) => {
  const {id, name, imageData, imageName, price} = candy
  
  const dispatch = useDispatch()
  const [visibleQuantity, setVisibleQuantity] = useState(quantity)
  
  const imageSrc = getImage(imageData?.data, DefaultCandy)
  const isAllowedToDecrement = visibleQuantity === 1;
  
  const debouncedUpdate = useMemo(() => debounce((id, visibleQuantity, quantity) => {
    if (visibleQuantity !== quantity) {
      dispatch(updateBasketCandies({
        candyId: id,
        quantity: visibleQuantity
      }))
        .unwrap()
        .then()
        .catch(() => {
        })
    }
  }, 500), [dispatch]);
  
  const handleIncrement = useCallback(() => {
    if (visibleQuantity < 20) {
      setVisibleQuantity(visibleQuantity + 1)
      debouncedUpdate(id, visibleQuantity + 1, quantity)
    }
  }, [debouncedUpdate, visibleQuantity, id, quantity])
  
  const handleDecrement = useCallback(() => {
    setVisibleQuantity(visibleQuantity - 1)
    debouncedUpdate(id, visibleQuantity - 1, quantity)
  }, [debouncedUpdate, visibleQuantity, id, quantity])
  
  const handleDelete = useCallback(() => {
    dispatch(deleteBasketCandies({candyId: id}))
      .unwrap()
      .catch(() => {
      })
  }, [dispatch, id])
  
  return (
    <Grid container border="0.1rem solid lightgrey" padding="0.5rem" borderRadius="2rem" direction="row"
          justifyItems="center" alignItems="center">
      <Grid item xs={6} sm={3} md={1}>
        <ClearLink to={`/candy/${id}`}>
          <Avatar sx={{height: "5rem", width: "5rem", backgroundColor: "white"}}>
            <img
              src={imageSrc}
              alt={imageName}
              height="70rem"
            />
          </Avatar>
        </ClearLink>
      </Grid>
      <Grid item xs={6} sm={3} md={3}>
        <Typography>
          Name:
        </Typography>
        <Typography
          fontWeight="bold"
        >
          {`${getTitleCase(name)} `}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <Typography>
          Total price:
        </Typography>
        <Typography
          fontWeight="bold"
        >
          {`${price} RUB/piece, ${getPrettyPrice(price, quantity)} RUB total`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <ButtonGroup size="small" aria-label="small outlined button group" sx={{paddingRight: "2rem"}}>
              <Button
                onClick={handleDecrement}
                disabled={isAllowedToDecrement}
              >-
              </Button>
    
              <Button disabled>
                <Typography fontWeight="normal" color="black">
                  {visibleQuantity}
                </Typography>
              </Button>
              
              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </Grid>
          
          <Grid item xs={6}>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
      
      </Grid>
    </Grid>
  );
}

export default BasketItem;

BasketItem.propTypes = {
  candy: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageName: PropTypes.string,
    imageData: PropTypes.shape({
      data: PropTypes.array,
    }),
    price: PropTypes.string,
  }).isRequired,
  quantity: PropTypes.number.isRequired
};