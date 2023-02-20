import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import teamActiveService from '~services/team-active-service';

export const fetchProjectMembers = createAsyncThunk(
    'projectMembers/fetch',
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



const initialState = {
    entities: [
        {
            id: '1',
            avatar: 'Sindy',
            name: 'Lee Sang Min',
            address: '대구광역시 동구 큰고개로 35-2',
            email: 'ehdqn119@gmail.com',
            isAdmin: 'true',
            phone: '010-9830-5559',
            lastUpdated: 'Tue Nov 22 2022',
        },
        {
            id: '2',
            avatar: 'Yura',
            name: 'Lee Sang Hyup',
            address: '서울특별시 은마',
            email: 'ehdqn118@naver.com',
            isAdmin: 'false',
            phone: '010-2433-3579',
            lastUpdated: 'Mon Nov 22 2022',
        },
        {
            id: '3',
            avatar: 'Aliah Lane',
            name: 'Go seung Bum',
            address: '대구광역시 동구 큰고개로 35-2',
            email: 'ehdqn119@gmail.com',
            isAdmin: false,
            phone: '010-9830-5559',
            lastUpdated: 'Mon Nov 22 2022',
        },
        {
            id: '4',
            avatar: 'Sindy',
            name: 'Lee Yu ra',
            address: '대구광역시 동구 큰고개로 35-2',
            email: 'ehdqn119@gmail.com',
            isAdmin: false,
            phone: '010-9830-5559',
            lastUpdated: 'Mon Nov 22 2022',
        },
        {
            id: '5',
            avatar: 'Yura',
            name: 'Sin su cheol',
            address: '대구광역시 동구 큰고개로 35-2',
            email: 'ehdqn119@gmail.com',
            isAdmin: true,
            phone: '010-9830-5559',
            lastUpdated: 'Mon Nov 22 2022',
        },
        {
            id: '6',
            avatar: 'Yura',
            name: 'Lee da won',
            address: '대구광역시 동구 큰고개로 35-2',
            email: 'ehdqn119@gmail.com',
            isAdmin: false,
            phone: '010-9830-5559',
            lastUpdated: 'Mon Nov 22 2022',
        },
    ],
    loading: 'idle',
    error: null,
    checked : false,
}


export const projectMemberSlice = createSlice({
    name: 'projectMember',
    initialState,
    reducers: {},
    extraReducers: {

    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions


// useSelector state

// export reducer
export default projectMemberSlice.reducer;