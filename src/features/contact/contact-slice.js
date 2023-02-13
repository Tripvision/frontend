import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import contactService from '~services/contact-service';

export const fetchMyContactsPosition = createAsyncThunk(
    'my/contacts/position/fetch',
    async (_, thunkAPI) => {
      try {
        const response = await contactService.getMyContactsPosition();
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
    loading : false,
    entities: [
        {
            first: 'Lee ',
            last: 'Yura',
            email: 'ehdqn119@gmail.com',
            // 유저 이미지는 백엔드에서 가져오도록 합시다.
            imageUrl: '/avatar/Yura.svg',
        },
        {
            first: 'Katarina ',
            last: 'Sindy',
            email: 'ehdqn118@naver.com',
            // 유저 이미지는 백엔드에서 가져오도록 합시다.
            imageUrl: '/avatar/Sindy.svg',
        },
        {
            first: 'Aliah ',
            last: 'Lane',
            email: 'ehdqn123@naver.com',
            // 유저 이미지는 백엔드에서 가져오도록 합시다.
            imageUrl: '/avatar/Aliah Lane.svg',
        },
    ],

}


export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMyContactsPosition.pending] : (state, action) => {
            if(state.loading === 'idle') {
              state.loading = 'pending'
            }
          },
          [fetchMyContactsPosition.fulfilled]: (state, action) => {
            state.loading = 'idle'
            state.entities.push(action.payload)
          },
          [fetchMyContactsPosition.rejected]: (state, action) => {
            if (state.loading === 'pending') {
              state.loading = 'idle'
              state.error = action.error
            }
          },

    },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions

export const contact = (state) => state.contact.entities;


// useSelector state
// export const defaultActivities = (state) => state.entities.activities;

// export reducer
export default contactsSlice.reducer;