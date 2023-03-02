import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { teamService, deleteProjectMember } from '~services/team-service';

export const fetchProjectMembersThunk = createAsyncThunk(
    'projectMembers/fetch',
    async (projectId, thunkAPI) => {
        try {
            const response = await teamService.getProjectMembers(projectId);
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


export const updateProjectMemberThunk = createAsyncThunk(
    'projectMembers/update',
    async (request, thunkAPI) => {
        try {
            console.log("update member")
            console.log(request.selectionModel);
            console.log(request.projectId)
            console.log(request['0'])
            const { projectId} = request;
            const member = request['0'];
            const response = await teamService.updateProjectMember(projectId, member);
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


export const deleteProjectMemberThunk = createAsyncThunk(
    'projectMembers/delete',
    async (request, thunkAPI) => {
        try {
            const { projectId, memberId } = request;
            console.log(projectId + "  a" + memberId)
            const response = await teamService.deleteProjectMember(projectId, memberId);
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
export const InviteProjectMemberThunk = createAsyncThunk(
    'projectMembers/invite',
    async (request, thunkAPI) => {
        try {
            const { projectId, memberEmail } = request[0];
            const mergeAuthority = [{
                email: memberEmail,
                authority: "GUEST",
            }]
            const response = await teamService.inviteProjectMember(projectId, mergeAuthority);
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
    ],
    loading: 'idle',
    error: null,
    checked: false,
}


export const projectMemberSlice = createSlice({
    name: 'projectMember',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProjectMembersThunk.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [fetchProjectMembersThunk.fulfilled]: (state, action) => {
            state.loading = 'idle'
            state.entities = action.payload;
        },

        [deleteProjectMemberThunk.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [deleteProjectMemberThunk.fulfilled]: (state, action) => {
            state.loading = 'idle'
            return initialState;
        },

        [InviteProjectMemberThunk.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [InviteProjectMemberThunk.fulfilled]: (state, action) => {

        },
    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions


// useSelector state

// export reducer
export default projectMemberSlice.reducer;