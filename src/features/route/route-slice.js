import { createSlice, createSelector } from '@reduxjs/toolkit'


const initialState = {
  entities : [],
  loading: 'idle',
  error: null,
}


export const routerSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    addPath : (state,action) => {
        if(state.entities.length >= 4) {
          let temp = state.entities.concat(action.payload);
          temp.shift();
          state.entities = temp;
        } 
        else {
          state.entities.push(action.payload);
        }
    },
    removePath : (state,action) => {
        const { id } = action.payload;
        state.entities.filter(x => x.id !== id); 
    }
  },
  extraReducers: {},
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions
export const { addPath, removePath } = routerSlice.actions;

// useSelector state


// export reducer
export default routerSlice.reducer;
