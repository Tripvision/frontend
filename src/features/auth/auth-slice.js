import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import localStorage from 'redux-persist/es/storage';

import authService from '~services/auth-service';

// createAsyncThunk
export const login = createAsyncThunk('auth/login', async (_, thunkAPI) => {
    try {
      const response = await authService.login();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
});
  
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});
 
const initialState = {
    userInfo : {},
    accessToken : null,
    isLoggedIn : null,
  }
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers : {
      setToken : (state, _) => {
        state.isLoggedIn = true;
      },
      removeToken : (state, _) => {
        localStorage.removeItem("accessToken");
        state.isLoggedIn = false;
      }
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
      [logout.fulfilled]: (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      },
    },
    
  });

// Auth selector
export const selectAuth = (state) => state.auth

// Actions sample
// export const { increment } = counterSlice.actions;
export const { setToken , removeToken } = authSlice.actions;

// reducer
export default authSlice.reducer