import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import commentService from '~services/comment-service';

export const fetchCommentListByTaskId = createAsyncThunk(
  'comment/list/fetch',
  async ({id, taskId}, thunkAPI) => {
    try {
      const response = await commentService.getCommentList(id, taskId);
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

export const postCommentByTaskId = createAsyncThunk(
    'comment/list/post',
    async ({id, taskId, comment}, thunkAPI) => {
      try {
        const response = await commentService.postComment(id, taskId, comment);
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

  export const updateCommentByTaskId = createAsyncThunk(
    'comment/list/update',
    async ({id, taskId, commentId, comment}, thunkAPI) => {
      try {
        const response = await commentService.updateComment(id, taskId, commentId, comment);
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

  export const deleteCommentByTaskId = createAsyncThunk(
    'comment/list/delete',
    async ({id, taskId, commentId, comment}, thunkAPI) => {
      try {
        const response = await commentService.deleteComment(id, taskId, commentId, comment);
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
  commentList : [],
  loading: 'idle',
  error: null,
}


export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchCommentListByTaskId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.commentList = action.payload.content
    },
    [fetchCommentListByTaskId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

    [postCommentByTaskId.fulfilled]: (state, action) => {
      state.loading = 'idle'
      state.commentList.push(action.payload)
    },
    [postCommentByTaskId.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
    },

  },
})

// export reducer
export default commentSlice.reducer;