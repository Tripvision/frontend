import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import teamService from '~services/team-service';

export const fetchTeamByProjectId = createAsyncThunk(
  'team/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await teamService.getProjectTeamSetting();
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

export const fetchTeamMembersByProjectId = createAsyncThunk(
  'team/members/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await teamService.getProjectTeamMembers();
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

export const fetchTeamMemberByProjectId = createAsyncThunk(
  'team/member/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await teamService.getProjectTeamMember();
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


export const createTeamByProjectId = createAsyncThunk(
  'team/create',
  async (_, thunkAPI) => {
    try {
      const response = await teamService.createTeam();
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

// Invite members
export const UpdateTeamByProjectId = createAsyncThunk(
  'team/update',
  async (id, thunkAPI) => {
    try {
      const response = await teamService.updateTeam();
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

export const DeleteTeamByProjectId = createAsyncThunk(
  'team/delete',
  async (memberId, thunkAPI) => {
    try {
      const response = await teamService.deleteTeam(memberId);
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


const initialState = {
    teams: [],
    currentTeamId: undefined,
    loading: 'idle',
    error: null,
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchTeamByProjectId.fulfilled] : (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchTeamByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [fetchTeamMembersByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchTeamMembersByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [fetchTeamMemberByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.projects.push(action.payload)
    },
    [fetchTeamMemberByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [createTeamByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      const newProject = action.payload;
      return state.project.map((item) => item.id === action.payload.id ? 
      { ...item, newProject }  : item )
    },
    [createTeamByProjectId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },


    [UpdateTeamByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      return state.project.filter((project) => project.id !== action.payload);
    },
    [UpdateTeamByProjectId.rejected]: (state, action) => {
     if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [DeleteTeamByProjectId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      return state.project.filter((project) => project.id !== action.payload);
    },
    [DeleteTeamByProjectId.rejected]: (state, action) => {
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
export const selectTeams = (state) => state.team;
export const selectTeamNumber = (state) => state.team.teamId;
export const selectTeamMembers = (state) => state.team.members;
export const selectTeamMembersCount = (state) =>state.team.members.length();


// export reducer
export default teamSlice.reducer;