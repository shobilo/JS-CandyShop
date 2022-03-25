import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../api";

export const createBrand = createAsyncThunk(
  "filtersData/createBrand",
  async (brandFormData, thunkAPI) => {
    try {
      const { data } = await $authHost.post("brand", brandFormData)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const createType = createAsyncThunk(
  "filtersData/createType",
  async (typeFormData, thunkAPI) => {
    try {
      const { data } = await $authHost.post("type", typeFormData)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const createProperty = createAsyncThunk(
  "filtersData/createProperty",
  async (propertyFormData, thunkAPI) => {
    try {
      const { data } = await $authHost.post("property", propertyFormData)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

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

export const readAllProperties = createAsyncThunk(
  "filtersData/readAllProperties",
  async (_, thunkAPI) => {
    try {
      const { data } = await $host.get("property");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const readAllFiltersData = createAsyncThunk(
  "filterData/readAllFiltersData",
  async (_, thunkAPI) => {
    try {
      const [{ data: types }, { data: brands }, { data: properties }] = await Promise.all([
        await $host.get("type"),
        await $host.get("brand"),
        await $host.get("property")
      ]);

      return {
        types,
        brands,
        properties,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "filtersData/updateBrand",
  async (brand, thunkAPI) => {
    try {
      const { id } = brand
      const { data } = await $authHost.put(`brand/${id}`, brand)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const updateType = createAsyncThunk(
  "filtersData/updateType",
  async (type, thunkAPI) => {
    try {
      const { id } = type
      const { data } = await $authHost.put(`type/${id}`, type)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const updateProperty = createAsyncThunk(
  "filtersData/updateProperty",
  async (property, thunkAPI) => {
    try {
      const { id } = property
      const { data } = await $authHost.put(`property/${id}`, property)

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const deleteBrand = createAsyncThunk(
  "filtersData/deleteBrand",
  async (brandId, thunkAPI) => {
    try {
      await $authHost.delete(`brand/${brandId}`)

      return brandId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const deleteType = createAsyncThunk(
  "filtersData/deleteType",
  async (typeId, thunkAPI) => {
    try {
      await $authHost.delete(`type/${typeId}`)

      return typeId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const deleteProperty = createAsyncThunk(
  "filtersData/deleteProperty",
  async (propertyId, thunkAPI) => {
    try {
      await $authHost.delete(`property/${propertyId}`)

      return propertyId
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)


