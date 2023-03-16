import {
  createSlice,
  createSelector,
  createAsyncThunk,
  current,
} from "@reduxjs/toolkit";

import {
  getMyProjectsStatus,
  getMyProjects,
  getMyCurrentProject,
  getMyProjectFinanceTotal,
  getMyProjectOurClient,
  getMyProjectList,
  getMyProjectOverView,
  getMyProductList,
} from "~services/project-service";
import { updateProject } from "../../services/project-service";
import { createProject } from "~services/project-service";
import { deleteProject } from "~services/project-service";

export const fetchProjectListByUserId = createAsyncThunk(
  "projects/fetchProjectListByUserId",
  async (_, thunkAPI) => {
    try {
      console.log("projectList pending ");
      const response = await getMyProjectList();
      console.log(response.data);
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

export const fetchMyProductivity = createAsyncThunk(
  "my/productivity/",
  async (_, thunkAPI) => {
    try {
      const response = await getMyProductList();
      console.log(response.data);
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

export const fetchProjectOverViewById = createAsyncThunk(
  "projects/fetchProjectByUserId",
  async (projectId, thunkAPI) => {
    try {
      const response = await getMyProjectOverView(projectId);
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

export const fetchMyProjectSituation = createAsyncThunk(
  "projects/situation ",
  async (_, thunkAPI) => {
    try {
      const response = await getMyCurrentProject();
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

export const createProjectByUserId = createAsyncThunk(
  "projects/createProject",
  async (_, thunkAPI) => {
    try {
      const response = await createProject();
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

const UpdateProjectByUserId = createAsyncThunk(
  "projects/updateProject",
  async (id, thunkAPI) => {
    try {
      const response = await updateProject(id);
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

const DeleteProjectByUserId = createAsyncThunk(
  "projects/deleteProjectByUserId",
  async (id, thunkAPI) => {
    try {
      const response = await deleteProject(id);
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
  projects: [],
  project: {
    activityList: {},
    fileList: [],
    memberList: [],
    projectOverViewHeadDto: {},
  },
  productList: [],
  meta: {},
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjectListByUserId.fulfilled]: (state, action) => {
      state.loading = "idle";
      console.error(action.payload);
      state.projects = action.payload;
    },
    [fetchProjectListByUserId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    // fetch Project
    [fetchProjectOverViewById.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [fetchProjectOverViewById.fulfilled]: (state, action) => {
      state.loading = "idle";
      const newProject = action.payload;
      state.project = newProject;
    },
    [fetchProjectOverViewById.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    // fetch Project
    [fetchMyProjectSituation.pending]: (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    },
    [fetchMyProjectSituation.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.meta = action.payload;
    },
    [fetchMyProjectSituation.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    // create

    [createProjectByUserId.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.projects.push(action.payload);
    },
    [createProjectByUserId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [UpdateProjectByUserId.fulfilled]: (state, action) => {
      state.loading = "idle";
      const newProject = action.payload;
      return state.project.map((item) =>
        item.id === action.payload.id ? { ...item, newProject } : item
      );
    },
    [UpdateProjectByUserId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    [DeleteProjectByUserId.fulfilled]: (state, action) => {
      state.loading = "idle";
      return state.project.filter((project) => project.id !== action.payload);
    },
    [DeleteProjectByUserId.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },

    // productivity
    [fetchMyProductivity.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.productList = action.payload;
    },
    [fetchMyProductivity.rejected]: (state, action) => {
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
export const selectProjects = (state) => state.projects;
export const selectProjectCount = (state) => state.projects.length();

// 단일 프로젝트 스테이트 가져오기

export const selectCurrentProjects = (state) =>
  state.projects.filter((project) => project.status === "current");

// export reducer
export default projectsSlice.reducer;

export const { statusColor } = projectsSlice.actions;
