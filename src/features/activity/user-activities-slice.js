import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userActiveService from '~services/user-activies-service';

export const fetchUserActiveListByProjectId = createAsyncThunk(
  'activies/list/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await userActiveService.getUserActiveList();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      } 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const fetchUserActiveByProjectId = createAsyncThunk(
  'activies/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await userActiveService.getUserActive();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      } 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const createUserActiveByProjectId = createAsyncThunk(
  'activies/create',
  async (_, thunkAPI) => {
    try {
      const response = await userActiveService.createUserActive();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      } 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


export const updateUserActiveByProjectId = createAsyncThunk(
  'activies/update',
  async (_, thunkAPI) => {
    try {
      const response = await userActiveService.updateUserActive();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      } 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const deleteUserActiveByProjectId = createAsyncThunk(
  'activies/delete',
  async (_, thunkAPI) => {
    try {
      const response = await userActiveService.deleteUserActive();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      } 
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const initialState = {
    loading : false,
    entities : [
      {
        id : '1',
        first: 'Lee ',
        last: 'Yura',
        email: 'ehdqn119@gmail.com',
        // 유저 이미지는 백엔드에서 가져오도록 합시다.
        imageUrl: '/avatar/Yura.svg',
      },
      {
        id : '2',
        first: 'Katarina ',
        last: 'Sindy',
        email: 'ehdqn118@naver.com',
        // 유저 이미지는 백엔드에서 가져오도록 합시다.
        imageUrl: '/avatar/Sindy.svg',
      },
      {
        id : '3',
        first: 'Aliah ',
        last: 'Lane',
        email: 'ehdqn123@naver.com',
        // 유저 이미지는 백엔드에서 가져오도록 합시다.
        imageUrl: '/avatar/Aliah Lane.svg',
      },
    ],
}

export const userActivitiesSlice = createSlice({
  name: 'userActivities',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserActiveListByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchUserActiveListByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchUserActiveByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchUserActiveByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [createUserActiveByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [createUserActiveByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [updateUserActiveByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [updateUserActiveByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [deleteUserActiveByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [deleteUserActiveByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions



// useSelector state
export const userActivityList = (state) => state.userActivities.entities;


// export reducer
export default userActivitiesSlice.reducer;