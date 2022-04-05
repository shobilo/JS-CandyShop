import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  ButtonGroup,
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
import {readAllCandies} from "../../../redux/features/candies/candiesActionCreators";

const BasketItem = ({candy, quantity}) => {
  const {id, name, imageData, imageName, price} = candy
  
  const dispatch = useDispatch()
  const [visibleQuantity, setVisibleQuantity] = useState(quantity)
  
  const imageSrc = getImage(imageData?.data, DefaultCandy)
  const isAllowedToDecrement = visibleQuantity === 1;
  
  const debouncedUpdate = useMemo(() => debounce((id, visibleQuantity) => {
    dispatch(updateBasketCandies({
      candyId: id,
      quantity: visibleQuantity
    }))
      .unwrap()
      .then()
      .catch((error) => {
        alert(error)
      })
  }, 500), [dispatch]);
  
  const handleIncrement = useCallback(() => {
    if (visibleQuantity < 20) {
      setVisibleQuantity(visibleQuantity + 1)
      debouncedUpdate(id, visibleQuantity + 1)
    }
  }, [debouncedUpdate, visibleQuantity, id])
  
  const handleDecrement = useCallback(() => {
    setVisibleQuantity(visibleQuantity - 1)
    debouncedUpdate(id, visibleQuantity - 1)
  }, [debouncedUpdate, visibleQuantity, id ])
  
  const handleDelete = useCallback(() => {
    dispatch(deleteBasketCandies({candyId: id}))
      .unwrap()
      .catch((error) => {
        alert(error)
      })
  }, [dispatch, id])
  
  return (
    <ListItem
      sx={{border: "1px solid black", borderRadius: "0.5em", borderColor: "ButtonShadow"}}
      secondaryAction={
        <>
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
          
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemAvatar>
        <ClearLink to={`/candy/${id}`}>
          <Avatar sx={{height: "5rem", width: "5rem", backgroundColor: "white"}}>
            <img
              src={imageSrc}
              alt={imageName}
              height="70rem"
            />
          </Avatar>
        </ClearLink>
      </ListItemAvatar>
      
      <ListItemText sx={{paddingLeft: "2rem"}}>
        <ClearLink to={`/candy/${id}`}>
          <Typography variant="h6" fontWeight="bold">
            {`${getTitleCase(name)} `}
          </Typography>
          <Typography variant="text2" fontWeight="lighter">
            {`${price} RUB/piece`}
          </Typography>
        </ClearLink>
      </ListItemText>
    </ListItem>
  );
}

export default BasketItem;

BasketItem.propTypes = {

};