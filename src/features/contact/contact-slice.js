import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "~services/contact-service";

export const fetchMyContactsPosition = createAsyncThunk(
  "my/contacts/position/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await contactService.getConnectMembers();
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
  loading: false,
  entities: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMyContactsPosition.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.entities = action.payload;
    },
    [fetchMyContactsPosition.rejected]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = action.error;
      }
    },
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = projectSlice.actions

export const contact = (state) => state.contact.entities;

// useSelector state
// export const defaultActivities = (state) => state.entities.activities;

// export reducer
export default contactsSlice.reducer;
