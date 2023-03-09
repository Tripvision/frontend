import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import fileService from '~services/file-service';

export const fetchfileListByProjectId = createAsyncThunk(
  'fileList/fetch',
  async (id, thunkAPI) => {
    try {
      const response = await fileService.getProjectFileList(id);
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

export const fetchFileByProjectId = createAsyncThunk(
  'files/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await fileService.getProjectFile();
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

export const createFileByProjectId = createAsyncThunk(
  'files/create',
  async ({id,taskId,files}, thunkAPI) => {
    try {
      const response = await fileService.createProjectFile(id,taskId,files);
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


export const UpdateFileByProjectId = createAsyncThunk(
  'files/update',
  async (id, thunkAPI) => {
    try {
      const response = await fileService.updateProjectFile();
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

export const DeleteFileByTaskId = createAsyncThunk(
  'files/delete',
  async ({id,taskId,files}, thunkAPI) => {
    try {
      console.log(id)
      console.log(taskId)
      console.log(files)
      const response = await fileService.deleteProjectFile(id,taskId);
      const dispatch = useDispatch();
      dispatch(createFileByProjectId({id,taskId,files}))
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
  files: [
    {
      id: '1',
      type: 'jpg',
      img: 'asda',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
    {
      id: '2',
      type: 'pdf',
      img: 'https://images.pexels.com/photos/445109/pexels-photo-445109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
    {
      id: '3',
      type: 'xls',
      img: '',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
    {
      id: '4',
      type: 'zip',
      img: '',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
    {
      id: '5',
      type: 'jpg',
      img: '',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
    {
      id: '6',
      type: 'jpg',
      img: '',
      name: 'Project tech requirements.pdf',
      size: '5.6',
      uploader: 'Karina Clark',
      uploadTime: 'Mon Nov 22 2022',
    },
  ],
  loading: 'idle',
  currentProjectId: undefined,
  error: null,
}


export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchfileListByProjectId.pending]: (state, action) => {
      if (state.loading === 'idle') {
          state.loading = 'pending'
      }
  },
  [fetchfileListByProjectId.fulfilled]: (state, action) => {
    state.files = action.payload.content;
  },
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions


// useSelector state
export const selectFiles = (state) => state.files;
export const selectFilesCount = (state) => state.files.length();


// export reducer
export default filesSlice.reducer;