import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fileService from '~services/file-service';

export const fetchfileListByProjectId = createAsyncThunk(
  'files/list/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.getProjectFileList();
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

export const fetchFileByProjectId = createAsyncThunk(
  'files/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.getProjectFile();
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

export const createFileByProjectId = createAsyncThunk(
  'files/create',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.createProjectFile();
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


export const UpdateFileByProjectId = createAsyncThunk(
  'files/update',
  async (id, thunkAPI) => {
    try {
      const response = await fileService.updateProjectFile();
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

export const DeleteFileByProjectId = createAsyncThunk(
  'files/delete',
  async (id, thunkAPI) => {
    try {
      const response = await fileService.deleteProjectFile();
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
    files: [],
    loading: 'idle',
    currentProjectId: undefined,
    error: null,
}


export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchfileListByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchfileListByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchFileByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchFileByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [createFileByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [createFileByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [UpdateFileByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [UpdateFileByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [DeleteFileByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [DeleteFileByProjectId.rejected]: (state, action) => {
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
export const selectFiles = (state) => state.files;
export const selectFilesCount = (state) => state.files.length();


// export reducer
export default filesSlice.reducer;