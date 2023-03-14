import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamActiveService from "~services/team-active-service";

export const fetchTeamActiveListByProjectId = createAsyncThunk(
  "activities/fetch",
  async (projectId, thunkAPI) => {
    try {
      const response = await teamActiveService.getTeamActiveList(projectId);
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

export const createTeamActiveByProjectId = createAsyncThunk(
  "activities/create",
  async (_, thunkAPI) => {
    try {
      const response = await teamActiveService.createTeamActive();
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

export const updateTeamActiveByProjectId = createAsyncThunk(
  "tasks/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await teamActiveService.updateTeamActive;
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

export const deleteTeamActiveByProjectId = createAsyncThunk(
  "tasks/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await teamActiveService.deleteTeamActive();
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

const initialState = {
  entities: [
    {
      id: "1",
      type: "jpg",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Yura",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
    {
      id: "2",
      type: "zip",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Sindy",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
    {
      id: "3",
      type: "jpg",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Sindy",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
    {
      id: "4",
      type: "jpg",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Sindy",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
    {
      id: "5",
      type: "jpg",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Aliah Lane",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
    {
      id: "6",
      type: "jpg",
      fileImg: "cocd",
      fileName: "Project tech requirements.pdf",
      userName: "Lee Sang Min",
      userAvatar: "Aliah Lane",
      fileSize: "5.6",
      uploadTime: "Mon Nov 22 2022",
    },
  ],
  currentTeamId: undefined,
  loading: "idle",
  error: null,
};

export const teamActivitiesSlice = createSlice({
  name: "teamActivities",
  initialState,
  reducers: {},
  extraReducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions

// useSelector state
export const selectTeamActivities = (state) => state.teamActivities.entities;
export const selectTeamActivitiesCount = (state) =>
  state.teamActivities.entities.length();

// export reducer
export default teamActivitiesSlice.reducer;
