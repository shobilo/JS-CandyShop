import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../api";
import { getPagesCount } from "../../../utils/getPagesCount";

export const readAllCandies = createAsyncThunk(
  "candies/readAllCandies",
  async (filterData, thunkAPI) => {
    try {
      const { data } = await $host.get("candy", {

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