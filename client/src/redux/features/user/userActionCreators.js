import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $authHost, $host } from "../../../api";
import roleCheck from "../../../utils/roleCheck";
import { setIsAdmin } from "./userReducer";

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

      if (isAdmin) {
          thunkAPI.dispatch(setIsAdmin(isAdmin))
      }

      return jwt_decode(data.token);
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

      return jwt_decode(data.token);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",

  async (_, thunkAPI) => {
    try {
      await localStorage.removeItem("token");
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
