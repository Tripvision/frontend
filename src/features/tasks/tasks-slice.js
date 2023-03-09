import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { getTaskListByMemberId, getTask, createTask, updateTask, deleteTask, getTaskListByProjectId } from '~services/task-service';

export const fetchTaskListByMemberId = createAsyncThunk(
  'tasks/list/fetch',
  async (memberId, thunkAPI) => {
    try {
      const response = await getTaskListByMemberId(memberId);
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

export const fetchTaskListByProjectId = createAsyncThunk(
  'projects/tasks/list/fetch',
  async (projectId, thunkAPI) => {
    try {
      const response = await getTaskListByProjectId(projectId);
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

export const fetchTaskByProjectId = createAsyncThunk(
  'projects/task/fetch',
  async ({ id, taskId }, thunkAPI) => {
    try {
      const response = await getTask(id, taskId);
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

export const createTaskByProjectId = createAsyncThunk(
  'tasks/create',
  async (formData, thunkAPI) => {
    const task = formData.get("request")
    const taskParse = JSON.parse(task);

    const json = JSON.stringify(taskParse);
    const blob = new Blob([json], { type: "application/json" });
    formData.delete("request");
    formData.append("request", blob);

    console.warn(formData.get('request'));
    console.warn(formData.get('fileList'));
    try {
      const response = await createTask(taskParse.projectId, formData);
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


export const UpdateTaskByProjectId = createAsyncThunk(
  'tasks/update',
  async ({id,task,taskId}, thunkAPI) => {
    try {
      console.log(task);
      const response = await updateTask(id,task,taskId);
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

export const DeleteTaskByProjectId = createAsyncThunk(
  'tasks/delete',
  async ({id,taskId,files}, thunkAPI) => {
    try {
      const deleteResponse = await deleteTask();
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
  task: {
    commentList : [],
    fileList : [],
  },
  entities : [

  ],
  statusList: {
    COMPLETED: [],
    PROGRESS: [],
    YET: [],
  },
  loading: 'idle',
  error: null,
}


export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchTaskListByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.statusList = action.payload
    },

    [fetchTaskListByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchTaskListByMemberId.fulfilled]: (state, action) => {
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
      state.task = action.payload
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
      state.entities.push(action.payload);
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
      state.task = action.payload;
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
// export const selectTasks = (state) => state.tasks;
// export const selectTasksCount = (state) => state.tasks.length();

// export const selectYetTasks = (state) => state.tasks.filter((task) => task.status === "Yet");
// export const selectYetTasksCount = (state) => state.tasks.filter((task) => task.status === "Yet").length();

// export const selectProgressTasks = (state) => state.tasks.filter((task) => task.status === "Progress");
// export const selectProgressTasksCount = (state) => state.tasks.filter((task) => task.status === "Progress").length();


// export const selectCompletedTasks = (state) => state.tasks.filter((task) => task.status === "Completed");
// export const selectCompletedCount = (state) => state.tasks.filter((task) => task.status === "Completed");


// export reducer
export default tasksSlice.reducer;