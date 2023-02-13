import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProjectSetting, createSetting, updateSetting, deleteSetting } from '~services/setting-service';


export const fetchSettingsByProjectId = createAsyncThunk(
  'settings/fetch',
  async (id, thunkAPI) => {
    try {
      const response = await getProjectSetting(id);
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createSettingsByProjectId = createAsyncThunk(
  'settings/create',
  async (setting, thunkAPI) => {
    console.log(setting);
    try {
      const response = await (createSetting(setting));
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const UpdateSettingsByProjectId = createAsyncThunk(
  'settings/update',
  async (setting, thunkAPI) => {
    console.log(setting);
    try {
      const response = await (updateSetting(setting));
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const DeleteSettingsByProjectId = createAsyncThunk(
  'settings/delete',
  async (id, thunkAPI) => {
    try {
      const response = await (deleteSetting(id));
      return id;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  setting: {
    id: undefined,
    logo: '',
    name: 'My sample Project',
    type: 'good man',
    description: '',
    dueDate: null,
    notifications : null,
    status: false,
  },
  loading: 'idle',
  currentTeamId: undefined,
  error: null,
}

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [createSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [createSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [UpdateSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      const newProject = action.payload;
      return state.project.map((item) => item.id === action.payload.id ?
        { ...item, newProject } : item)
    },
    [UpdateSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [DeleteSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      return state.project.filter((project) => project.id !== action.payload);
    },
    [DeleteSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    }
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions


// useSelector state
export const selectSettings = (state) => state.settings;


// export reducer
export default settingsSlice.reducer;