import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../../api";

export const readBasketCandies = createAsyncThunk(
  "basket/readBasketCandies",
  async (_, thunkAPI) => {
    try {
      const { data } = await $authHost.get(`basket`)
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const updateBasketCandies = createAsyncThunk(
  "basket/updateBasketCandies",
  async (addData, thunkAPI) => {
    try {
      const { data } = await $authHost.post("basket/update", addData)
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const deleteBasketCandies = createAsyncThunk(
  "basket/deleteBasketCandies",
  async (deleteData, thunkAPI) => {
    try {
      const { candyId } = deleteData
      const { data } = await $authHost.delete(`basket/delete/${candyId}`)
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)