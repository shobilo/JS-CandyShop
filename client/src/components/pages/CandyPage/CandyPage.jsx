import {CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CandyInfo from "./CandyInfo";
import CandyMediaOrder from "./CandyMediaOrder";
import { readCandyById } from "../../../redux/features/candies/candiesActionCreators";
import { resetCandy } from "../../../redux/features/candies/candiesSlice";
import BackButton from "../../UI/BackButton";
import {getTitleCase} from "../../../utils/getTitleCase";


const CandyPage = () => {
  const dispatch = useDispatch();
  
  const { id: candyId } = useParams();
  const { candy: currentCandy, isLoading } = useSelector((state) => state.candies);
  
  
  const { brand, name, imageData, imageName, price, properties, averageRating, type } = currentCandy
  
  useEffect(() => {
    dispatch(readCandyById(candyId))
      .unwrap()
      .catch(() => {});
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
            <Grid item xs={12} sm={1}>
              <BackButton path="/"/>
            </Grid>
            <Grid item xs={12} md={5}>
              <div style={{display: "flex"}}>
                <CandyMediaOrder
                  candyId={candyId}
                  imageData={imageData}
                  imageName={imageName}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
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
