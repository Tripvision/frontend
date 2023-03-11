import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProjectSetting,
  createSetting,
  updateSetting,
  deleteSetting,
} from "~services/setting-service";

export const fetchSettingsByProjectId = createAsyncThunk(
  "project/setting/fetch",
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

export const createSettingsByMemberId = createAsyncThunk(
  "project/setting/create",
  async (formData, thunkAPI) => {
    const project = formData.get("request");
    const projectParse = JSON.parse(project);
    const json = JSON.stringify(projectParse);
    const blob = new Blob([json], { type: "application/json" });
    formData.delete("request");
    formData.append("request", blob);
    try {
      const response = await createSetting(formData);
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
  "project/setting/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const project = formData.get("request");
      const projectParse = JSON.parse(project);

      const json = JSON.stringify(projectParse);
      const blob = new Blob([json], { type: "application/json" });
      formData.delete("request");
      formData.append("request", blob);
      const response = await updateSetting(id, formData);
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
  "project/setting/delete",
  async (id, thunkAPI) => {
    try {
      const response = await deleteSetting(id);
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
  setting: {},
  loading: "idle",
  currentTeamId: undefined,
  error: null,
};

export const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.setting = action.payload;
    },
    [fetchSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [createSettingsByMemberId.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.setting = action.payload;
    },
    [createSettingsByMemberId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [UpdateSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.setting = action.payload;
    },
    [UpdateSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [DeleteSettingsByProjectId.fulfilled]: (state, action) => {
      state.loading = "idle";
      return initialState;
    },
    [DeleteSettingsByProjectId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions

// useSelector state
export const selectSettings = (state) => state.settings;

// export reducer
export default settingsSlice.reducer;
