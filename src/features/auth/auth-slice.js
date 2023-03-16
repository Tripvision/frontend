import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";

import authService from "~services/auth-service";

// createAsyncThunk
export const login = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  try {
    const response = await authService.login();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const myProfile = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  try {
    const response = await authService.myProfile();
    console.log(response.data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue();
  }
});

export const updateMyProfile = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const member = formData.get("request");
      const memberParse = JSON.parse(member);

      const json = JSON.stringify(memberParse);
      const blob = new Blob([json], { type: "application/json" });
      formData.delete("request");
      formData.append("request", blob);
      const response = await authService.updateProfile(member);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  userInfo: {},
  accessToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, _) => {
      state.isLoggedIn = true;
    },
    removeToken: (state, _) => {
      localStorage.removeItem("accessToken");
      return initialState;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },

    [myProfile.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    [myProfile.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

// Auth selector
export const selectAuth = (state) => state.auth;

// Actions sample
// export const { increment } = counterSlice.actions;
export const { setToken, removeToken } = authSlice.actions;

// reducer
export default authSlice.reducer;
