import { CircularProgress, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CandyInfo from "./CandyInfo";
import CandyMediaOrder from "./CandyMediaOrder";
import { readCandyById } from "../../../redux/features/candies/candiesActionCreators";
import { resetCandy } from "../../../redux/features/candies/candiesSlice";
import BackButton from "../../UI/BackButton";


const CandyPage = () => {
  const dispatch = useDispatch();

  const { id: candyId } = useParams();
  const { candy, isLoading } = useSelector((state) => state.candies);
  const { brand, name, imageData, imageName, price, properties, averageRating, type } = candy
  
  useEffect(() => {
    dispatch(readCandyById(candyId))
      .unwrap()
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, candyId]);

  useEffect(() => {
    return () => {
      dispatch(resetCandy())
    }
  }, [dispatch])

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
              <div style={{display: "flex"}}>
                <BackButton path="/"/>
                <CandyMediaOrder
                  candyId={candyId}
                  imageData={imageData}
                  imageName={imageName}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={7}>
              <CandyInfo 
                id={candyId}
                brand={brand}
                name={name}
                price={price}
                properties={properties}
                averageRating={averageRating}
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
