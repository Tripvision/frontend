import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getTaskList, getTask, createTask, updateTask, deleteTask  } from '~services/task-service';

export const fetchTaskListByMemberId = createAsyncThunk(
  'tasks/member/list/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getTaskList();
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

export const fetchTaskListByProjectId = createAsyncThunk(
  'tasks/list/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getTaskList();
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

export const fetchTaskByProjectId = createAsyncThunk(
  'tasks/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getTask();
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

export const createTaskByProjectId = createAsyncThunk(
  'tasks/create',
  async (_, thunkAPI) => {
    try {
      const response = await createTask();
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


export const UpdateTaskByProjectId = createAsyncThunk(
  'tasks/update',
  async (id, thunkAPI) => {
    try {
      const response = await updateTask();
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

export const DeleteTaskByProjectId = createAsyncThunk(
  'tasks/delete',
  async (id, thunkAPI) => {
    try {
      const response = await deleteTask();
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
    entities: [],
    loading: 'idle',
    error: null,
}


export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchTaskListByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },

    [fetchTaskListByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchTaskListByMemberId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.entities.push(action.payload)
    },

    [fetchTaskListByMemberId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },



    // 여기는 수정해야 합니다.
    [fetchTaskByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchTaskByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    // 여기는 수정해야 합니다.
    [createTaskByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [createTaskByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    // 여기는 수정해야 합니다.
    [UpdateTaskByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      const newProject = action.payload;
      return state.project.map((item) => item.id === action.payload.id ? 
      { ...item, newProject }  : item )
    },
    [UpdateTaskByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    // 여기는 수정해야 합니다.
    [DeleteTaskByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      return state.project.filter((project) => project.id !== action.payload);
    },
    [DeleteTaskByProjectId.rejected]: (state, action) => {
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
export const selectTasks = (state) => state.tasks;
export const selectTasksCount = (state) => state.tasks.length();

export const selectYetTasks = (state) => state.tasks.filter((task) => task.status === "Yet");
export const selectYetTasksCount = (state) => state.tasks.filter((task) => task.status === "Yet").length();

export const selectProgressTasks = (state) => state.tasks.filter((task) => task.status === "Progress");
export const selectProgressTasksCount = (state) => state.tasks.filter((task) => task.status === "Progress").length();


export const selectCompletedTasks = (state) => state.tasks.filter((task) => task.status === "Completed");
export const selectCompletedCount = (state) => state.tasks.filter((task) => task.status === "Completed");


// export reducer
export default tasksSlice.reducer;