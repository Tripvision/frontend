import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import budgetService from '~services/budget-service';

export const fetchMyTopBudgets = createAsyncThunk(
  'budget/top/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await budgetService.getMyTopBudget();
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

export const fetchBudgetByProjectId = createAsyncThunk(
  'budget/fetch',
  async (id, thunkAPI) => {
    try {
      const response = await budgetService.getProjectBudget();
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

export const createBudgetByProjectId = createAsyncThunk(
  'budget/create',
  async (_, thunkAPI) => {
    try {
      const response = await budgetService.createProjectBudget();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const UpdateBudgetByProjectId = createAsyncThunk(
  'budget/update',
  async (id, thunkAPI) => {
    try {
      const response = await budgetService.updateProjectBudget();
      return response.data;  
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const DeleteBudgetByProjectId = createAsyncThunk(
  'budget/delete',
  async (id, thunkAPI) => {
    try {
      const response = await budgetService.deleteProjectBudget();
      return id; 
    } catch(err){
      let error = err;
      if(!error.response){
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  budget: {
    id: undefined,
    usageCharacter : '',
    notes: '',
    manageBudget: 'My sample Project',
    overuseNotifications: null,
    status: false,
  },
  loading: 'idle',
  currentTeamId: undefined,
  error: null,
}

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBudgetByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },
    [fetchBudgetByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [createBudgetByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },
    [createBudgetByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchMyTopBudgets.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },
    [fetchMyTopBudgets.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [UpdateBudgetByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },
    [UpdateBudgetByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [DeleteBudgetByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },
    [DeleteBudgetByProjectId.rejected]: (state, action) => {
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
export const selectBudget = (state) => state.budget;



// export reducer
export default budgetSlice.reducer;