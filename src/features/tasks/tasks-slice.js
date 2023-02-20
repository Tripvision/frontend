import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
  'tasks/list/fetch',
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
  'tasks/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getTask();
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
  async (_, thunkAPI) => {
    try {
      const response = await createTask();
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
  async (id, thunkAPI) => {
    try {
      const response = await updateTask();
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
  async (id, thunkAPI) => {
    try {
      const response = await deleteTask();
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
  entities: [
    {
      id: 1,
      tags: 'UI Design', // 태그는 자유롭게 만들 수 있습니다.
      title: 'good',
      content: 'dasdasdsadasd',
      status: 'yet',
      fileList: [
        {
          id: '1',
          fileName: 'pexels-photo-15579683.jpeg',
          fileSize: '',
          fileUploader: '1', // member Id 입니다.
        },
        {
          id: '2',
          fileName: 'pexels-photo-123132.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '2', // member Id 입니다.
        },
        {
          id: '3',
          fileName: 'pexels-bike-1222.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '1', // member Id 입니다.
        },
      ]
    },
    {
      id: 2,
      tags: 'UI Design', // 태그는 자유롭게 만들 수 있습니다.
      title: 'good',
      content: 'dasdasdsadasd',
      status: 'progress',
      fileList: [
        {
          id: '4',
          fileName: 'pexels-photo-15579683.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '1', // member Id 입니다.
        },
        {
          id: '5',
          fileName: 'pexels-photo-123132.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '2', // member Id 입니다.
        },
        {
          id: '6',
          fileName: 'pexels-bike-1222.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '1', // member Id 입니다.
        },
      ]
    },
    {
      id: 3,
      tags: 'UI Design', // 태그는 자유롭게 만들 수 있습니다.
      title: 'good',
      content: 'dasdasdsadasd',
      status: 'completed',
      fileList: [
        {
          id: '7',
          fileName: 'pexels-photo-15579683.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '1', // member Id 입니다.
        },
        {
          id: '8',
          fileName: 'pexels-photo-123132.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '2', // member Id 입니다.
        },
        {
          id: '9',
          fileName: 'pexels-bike-1222.jpeg',
          fileSize: '', // 올리고 계산이 되는 건지 계산을 해야하는건지 찾아보겠습니다.
          fileUploader: '1', // member Id 입니다.
        },
      ]
    },
  ],
  statusList: {
    yet: [
      {
        id: '1',
        name: '',
        title: 'Yet Task1',
        content: 'asdasdasd',
        status: 'yet',
        dueDate: 'Due Date: Jun 20, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '75%',
        tags : 'UI Design',
      },
      {
        id: '2',
        name: '',
        title: 'Yet Task2',
        content: 'asdasds',
        status: 'yet',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '100%',
        tags : 'Development',
      },
      {
        id: '3',
        name: '',
        title: 'Yet Task3',
        content: '123123123',
        status: 'yet',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '45%',
        tags : 'Testing',
      },
    ],
    progress: [
      {
        id: '1',
        name: '',
        title: 'Progoress Task1',
        content: 'asdasdasd',
        status: 'progress',
        dueDate: 'Due Date: Jun 20, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '100%',
        tags : 'Testing',
      },
      {
        id: '2',
        name: '',
        title: 'Progoress Task2',
        content: 'asdasds',
        status: 'progress',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '100%',
        tags : 'QA',
      },
      {
        id: '3',
        name: '',
        title: 'Progoress Task3',
        content: '123123123',
        status: 'progress',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '36%',
        tags : 'Phase 2.6 QA',
      },
    ],
    completed: [
      {
        id: '1',
        name: 'a1s2',
        title: 'Coffee detail page - Main Page',
        content: 'asdasdasd',
        status: 'completed',
        dueDate: 'Due Date: Jun 20, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '38%',
        tags : 'Phase 2.6 QA',
      },
      {
        id: '2',
        name: '',
        title: 'Poster illustation design',
        content: 'asdasds',
        status: 'completed',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '78%',
        tags : 'UI Design',
      },
      {
        id: '3',
        name: '',
        title: 'Poster illustation design',
        content: '123123123',
        status: 'completed',
        dueDate: 'Due Date: Nov 10, 2022',
        logoUrl: '',
        type: '',
        description: '',
        completePercent: '18%',
        tags : 'UI Design',
      },
    ],
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
      state.entities.push(action.payload)
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
        { ...item, newProject } : item)
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