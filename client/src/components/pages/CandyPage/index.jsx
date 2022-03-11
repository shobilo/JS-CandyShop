import { CircularProgress, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CandyInfo from "./CandyInfo";
import CandyMediaOrder from "./CandyMediaOrder";
import { readCandyById } from "../../../redux/features/candies/candiesActionCreators";
import { getAverageValue } from "../../../utils/getAverageValue";


const CandyPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { candy, isLoading } = useSelector((state) => state.candies);
  const { brand, name, imageData, imageName, price, properties, ratings, type } = candy
  let rating = 0

  if (ratings?.length > 0) {
    const ratingsArray = ratings.map((rating) => rating.rating);
    rating = getAverageValue(ratingsArray);
  }

  useEffect(() => {
    dispatch(readCandyById(id))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
  }, [dispatch, id]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {isLoading ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12} md={5}>
              <CandyMediaOrder 
                imageData={imageData}
                imageName={imageName}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <CandyInfo 
                id={id}
                brand={brand}
                name={name}
                price={price}
                properties={properties}
                rating={rating}
                type={type}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default CandyPage;
