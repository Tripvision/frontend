import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  left: {
    id: '1',
    display: 'block',
    size: 2,
  },
  center: {
    id: '2',
    display: 'block',
    size: 10,
  },
  right: {
    id: '3',
    display: 'none',
    size: 0,
  },
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    left: state => {
      if (state.left.display === 'block') {
        if (state.right.display === 'block') {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              display: 'none',
              size: 0,
            },
            center: {
              ...state.center,
              size : state.left.size + state.center.size,
            },
            right: {
              ...state.right,
              size: 12 - (state.center.size + state.left.size),
            },
            // change right size 12 cal
          };
        } else {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              display: 'none',
              size: 0,
            },
            center: {
              ...state.center,
              size : 12,
            },
            right: {
              ...state.right,
            },
            // change right size 12 cal
          };
        }
      } else {
        if (state.center.size === 12) {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              display: 'block',
              size: 2,
            },
            center: {
              ...state.center,
              size: 10,
            },
            right: {
              ...state.right,
            },
            // change right size 12 cal
          };
        } else {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              display: 'block',
              size: 2,
            },
            center: {
              ...state.center,
              size : 7,
            },
            right: {
              ...state.right,
              size : 3,
            },
            // change right size 12 cal
          };
        }
      }
    },
    right: state => {
      if (state.right.display === 'block') {
        if (state.left.display === 'block') {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              size: 12 - (state.center.size + state.right.size),
            },
            center: {
              ...state.center,
              size : state.center.size + state.right.size
            },
            right: {
              ...state.right,
              display: 'none',
              size: 0,
            },
          };
        } else {
          return {
            ...state,
            left: {
              ...state.left,
            },
            center: {
              ...state.center,
              size: 12,
            },
            right: {
              ...state.right,
              display : 'none',
              size: 0,
            },
            // change right size 12 cal
          };
        }
      } 
      // right none
      else {
        if (state.center.size === 12) {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
            },
            center: {
              ...state.center,
              size: 9,
            },
            right: {
              ...state.right,
              display: 'block',
              size: 3,
            },
            // change right size 12 cal
          };
        } else {
          return {
            ...state,
            left: {
              // change display none
              ...state.left,
              size: 2,
            },
            center: {
              ...state.center,
              size : 7,
            },
            right: {
              ...state.right,
              display: 'block',
              size : 3,
            },
            // change right size 12 cal
          };
        }
      }
    },
  },
});

export const { left, right } = layoutSlice.actions;

export default layoutSlice.reducer;
