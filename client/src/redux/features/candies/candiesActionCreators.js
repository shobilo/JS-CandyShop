import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../api";
import { getPagesCount } from "../../../utils/getPagesCount";

export const createCandy = createAsyncThunk(
  "filtersData/createCandy",
  async (candyFormData, thunkAPI) => {
    try {
      const { data } = await $authHost.post("candy", candyFormData)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const readAllCandies = createAsyncThunk(
  "candies/readAllCandies",
  async (filterData, thunkAPI) => {
    try {
      const { searchQuery, typeFilter, brandFilter, orderFilter, currentPage = 1 } = filterData

      const { data } = await $host.get("candy", {
        params: {
          page: currentPage,
          ...(searchQuery && {query: searchQuery}),
          ...(typeFilter && {typeId: typeFilter}),
          ...(brandFilter && {brandId: brandFilter}),
          ...(orderFilter && {order: orderFilter}),
        }
      })

      const totalPages = getPagesCount(data.count, 6)

      return {
        candies: data.rows,
        totalPages
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }

  }
)

export const readCandyById = createAsyncThunk(
  "candies/readCandyById",
  async (id, thunkAPI) => {
    try {
      const { data } = await $authHost.get(`candy/${id}`)

      return data
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

      return serverData
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }

  }
)

export const updateCandy = createAsyncThunk(
  "candies/updateCandy",
  async (candy, thunkAPI) => {
    try {
      const { id, formData } = candy
      const { data } = await $authHost.put(`candy/${id}`, formData)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const deleteCandy = createAsyncThunk(
  "filtersData/deleteCandy",
  async (candyId, thunkAPI) => {
    try {
      await $authHost.delete(`candy/${candyId}`)

      return candyId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)