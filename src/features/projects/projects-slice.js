import { createSlice, createSelector,createAsyncThunk } from '@reduxjs/toolkit'

import { getMyProjectsStatus, getMyProjects, getMyCurrentProject, getMyProjectFinanceTotal, getMyProjectOurClient } from '~services/project-service';
import { updateProject } from '../../services/project-service';
import { createProject } from '~services/project-service';
import { deleteProject } from '~services/project-service';


export const fetchProjectStatus = createAsyncThunk(
  'projects/status/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await getMyProjectsStatus();
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

export const fetchProjectByUserId = createAsyncThunk(
  'projects/fetchProjectByUserId',
  async (_, thunkAPI) => {
    try {
      const response = await getMyProjects();
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

export const fetchMyCurrentProject = createAsyncThunk(
  'projects/current',
  async (_, thunkAPI) => {
    try {
      const response = await getMyCurrentProject();
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

export const fetchMyProjectFinanceTotal = createAsyncThunk(
  'projects/finance/total',
  async (_, thunkAPI) => {
    try {
      const response = await getMyProjectFinanceTotal();
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

export const fetchMyProjectOurClient = createAsyncThunk(
  'projects/ourClient',
  async (_, thunkAPI) => {
    try {
      const response = await getMyProjectOurClient();
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



export const createProjectByUserId = createAsyncThunk(
  'projects/createProject',
  async (_, thunkAPI) => {
    try {
      const response = await (createProject());
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


const UpdateProjectByUserId = createAsyncThunk(
  'projects/updateProject',
  async (id, thunkAPI) => {
    try {
      const response = await (updateProject(id));
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

const DeleteProjectByUserId = createAsyncThunk(
  'projects/deleteProjectByUserId',
  async (id, thunkAPI) => {
    try {
      const response = await (deleteProject(id));
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
  projects: [],
  meta : [
    {
      CurrentProject : null
    },
    {
      FinanceTotal : null
    },
    {
      OurClient : null
    },
  ],
  loading: 'idle',
  error: null,
}


export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProjectByUserId.pending] : (state, action) => {
      if(state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    [fetchProjectByUserId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchProjectByUserId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchMyCurrentProject.pending] : (state, action) => {
      if(state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    [fetchMyCurrentProject.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.meta[0].CurrentProject = action.payload
    },
    [fetchMyCurrentProject.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchMyProjectFinanceTotal.pending] : (state, action) => {
      if(state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    [fetchMyProjectFinanceTotal.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.meta[1].FinanceTotal = action.payload
    },
    [fetchMyProjectFinanceTotal.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchMyProjectOurClient.pending] : (state, action) => {
      if(state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    [fetchMyProjectOurClient.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.meta[2].OurClient = action.payload
    },
    [fetchMyProjectOurClient.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [createProjectByUserId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [createProjectByUserId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [fetchProjectStatus.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchProjectStatus.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [UpdateProjectByUserId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      const newProject = action.payload;
      return state.project.map((item) => item.id === action.payload.id ? 
      { ...item, newProject }  : item )
    },
    [UpdateProjectByUserId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [DeleteProjectByUserId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      return state.project.filter((project) => project.id !== action.payload);
    },
    [DeleteProjectByUserId.rejected]: (state, action) => {
     if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    }
  }
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions


// useSelector state
export const selectProjects = (state) => state.projects;
export const selectProjectCount = (state) => state.projects.length();


export const selectCurrentProjects = (state) =>state.projects.filter((project) => project.status === 'current');

export const getFilterCurrent = createSelector(selectProjects, lists => {
  return lists.filter((project) => project.status === 'current' );
});


// export reducer
export default projectsSlice.reducer;



// Mock 데이터
// notifications : [
//   {
//     title: 'You have a bug that needs that pice of',
//     time: '5am ago',
//     type: 'bug',
//   },
//   {
//     title: 'New user registed',
//     time: '5am ago',
//     type: 'settings',
//   },
//   {
//     title: 'You have a bug that needs that',
//     time: '5am ago',
//     type: 'bug',
//   },
//   {
//     title: 'Andi Lane subscribed to you',
//     time: '5am ago',
//     type: 'social',
//   }
// ],
// activities : [
//   {
//     title: 'Edited the details of Project X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Sindy.svg',
//   },
//   {
//     title: 'Changed the Status of Project X in asdasdasdsad',
//     time: '5am ago',
//     userImageUrl : '/avatar/Aliah Lane.svg',
//   },
//   {
//     title: 'Submitted a bug',
//     time: '5am ago',
//     userImageUrl : '/avatar/Aliah Lane.svg',
//   },
//   {
//     title: 'Modified A data in Page X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Yura.svg',
//   },
//   {
//     title: 'Deleted a page in Project X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Yura.svg',
//   },
//   {
//     title: 'Edited the details of Project X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Sindy.svg',
//   },

//   {
//     title: 'Edited the details of Project X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Sindy.svg',
//   },

//   {
//     title: 'Edited the details of Project X',
//     time: '5am ago',
//     userImageUrl : '/avatar/Sindy.svg',
//   },
// ],

// users : [
//   {
//     first: 'Lee ',
//     last: 'Yura',
//     email: 'ehdqn119@gmail.com',
//     // 유저 이미지는 백엔드에서 가져오도록 합시다.
//     imageUrl: '/avatar/Yura.svg',
//   },
//   {
//     first: 'Katarina ',
//     last: 'Sindy',
//     email: 'ehdqn118@naver.com',
//     // 유저 이미지는 백엔드에서 가져오도록 합시다.
//     imageUrl: '/avatar/Sindy.svg',
//   },
//   {
//     first: 'Aliah ',
//     last: 'Lane',
//     email: 'ehdqn123@naver.com',
//     // 유저 이미지는 백엔드에서 가져오도록 합시다.
//     imageUrl: '/avatar/Aliah Lane.svg',
//   },
// ],
