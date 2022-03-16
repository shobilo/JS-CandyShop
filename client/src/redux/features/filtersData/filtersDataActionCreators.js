import { createAsyncThunk } from "@reduxjs/toolkit";
import { $host } from "../../../api";

export const readAllBrands = createAsyncThunk(
  "filtersData/readAllBrands",
  async (_, thunkAPI) => {
    try {
      const { data } = await $host.get("brand");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const readAllTypes = createAsyncThunk(
  "filtersData/readAllTypes",
  async (_, thunkAPI) => {
    try {
      const { data } = await $host.get("type");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const readAllFiltersData = createAsyncThunk(
  "filterData/readAllFiltersData",
  async (_, thunkAPI) => {
    try {
      const [{ data: types }, { data: brands }] = await Promise.all([
        await $host.get("type"),
        await $host.get("brand"),
      ]);

      return {
        types,
        brands,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
