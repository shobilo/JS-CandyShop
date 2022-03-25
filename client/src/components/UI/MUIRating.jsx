import { Rating } from '@mui/material'
import React, { useCallback, memo } from 'react'
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { changeCandyRating } from '../../redux/features/candies/candiesActionCreators';


const MUIRating = (props) => {
  const {id, rating} = props
  const dispatch = useDispatch()

  const handleRatingChanged = useCallback((event, newValue) => {
    let userRating = newValue

    if (!newValue) {
      const ceiledRating = Math.round(rating)
      userRating = ceiledRating
    }

    dispatch(changeCandyRating({ id, rating: userRating }))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, id, rating]);

  return (
    <Rating value={rating} onChange={handleRatingChanged} />
  )
}

export default memo(MUIRating)

MUIRating.propTypes = {
  id: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  rating: PropTypes.number
}

MUIRating.defaultProps = {
  rating: 0
}