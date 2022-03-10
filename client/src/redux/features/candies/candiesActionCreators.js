import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../api";
import { getPagesCount } from "../../../utils/getPagesCount";

export const readAllCandies = createAsyncThunk(
  "candies/readAllCandies",
  async (filterData, thunkAPI) => {
    try {
      const { searchQuery, typeFilter, brandFilter, orderFilter } = filterData

      const { data } = await $host.get("candy", {
        params: {
          ...(searchQuery && {query: searchQuery}),
          ...(typeFilter && {typeId: typeFilter}),
          ...(brandFilter && {brandId: brandFilter}),
          ...(orderFilter && {order: orderFilter}),
        }
      })
      const totalPages = getPagesCount(data.count, 9)

      return {
        candies: data.rows,
        totalPages
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }

  }
)

export const changeCandyRating = createAsyncThunk(
  "candies/changeCandyRating",
  async (data, thunkAPI) => {
    try {
      const { id, rating } = data

      const { data: serverData } = await $authHost.post(`candy/rating/${id}`, {
        rating
      })

      // const state = thunkAPI.getState()

      // const candies = state.candies.candies

      // console.log(candies)

      // const changedCandyIndex = candies.findIndex((candy) => candy.id == serverData.candyId)
      // candies[changedCandyIndex].ratings.push({rating})

      // console.log(candies[changedCandyIndex])

      return {
        serverData
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }

  }
)