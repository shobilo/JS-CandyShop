import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from "../../../api/APIAccess";
import roleCheck from "../../../utils/roleCheck";

export const registration = createAsyncThunk(
  "user/registration",

  async (regData, thunkAPI) => {
    try {
      const { data } = await $host.post("user/registration", regData);

      localStorage.setItem("token", data.token);

      return jwt_decode(data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",

  async (loginData, thunkAPI) => {
    try {
      const { data } = await $host.post("user/login", loginData);

      localStorage.setItem("token", data.token);

      const decodedData = jwt_decode(data.token)

      const isAdmin = roleCheck(decodedData.roles, "admin")

      return {
        userData: decodedData,
        isAdmin: isAdmin
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",

  async (_, thunkAPI) => {
    try {
      const { data } = await $authHost.get("user/auth");

      localStorage.setItem("token", data.token);

      const decodedData = jwt_decode(data.token)

      const isAdmin = roleCheck(decodedData.roles, "admin")

      return {
        userData: decodedData,
        isAdmin: isAdmin
      }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",

  async (_, thunkAPI) => {
    try {
      localStorage.removeItem("token");
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const readUserOrders = createAsyncThunk(
  "user/readUserOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await $authHost.get("user/orders")
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

export const readOrderById = createAsyncThunk(
  "user/readOrderById",
  async (orderInfo, thunkAPI) => {
    try {
      const {orderId} = orderInfo
      
      const {data} = await $authHost.get(`user/orders/${orderId}`)
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
