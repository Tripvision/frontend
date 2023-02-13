import { createSlice } from '@reduxjs/toolkit'

import { login } from '~features/auth/auth-slice'


const initialState = {
  loading: false,
  entities: [
    {
      id : '1',
      title: 'You have a bug that needs that pice of',
      time: '5am ago',
      type: 'bug',
      uuid: {},
      userId: null,
      data: null,
      creadtedAt: null,
      read_at: null,
      sibar : "왜 적용안돼냐",
    },
    {
      id : '2',
      title: 'New user registed',
      time: '5am ago',
      type: 'settings',
      uuid: {},
      userId: null,
      data: null,
      creadtedAt: null,
      read_at: null,
    },
    {
      id : '3',
      title: 'You have a bug that needs that',
      time: '5am ago',
      type: 'bug',
      uuid: {},
      userId: null,
      data: null,
      creadtedAt: null,
      read_at: null,
    },
    {
      id : '4',
      title: 'Andi Lane subscribed to you',
      time: '5am ago',
      type: 'bug',
      uuid: {},
      userId: null,
      data: null,
      creadtedAt: null,
      read_at: null,
    }
  ]
}

export const notifierSlice = createSlice({
  name: 'notifier',
  initialState,
  reducers: {
    read: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    }
    
  },
  extraReducers: {
    //login user
    [login.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },


  },
})


// Selectors
// export const selectUsers = (state) => state.userInfo
// export const { logout } = userSlice.actions


export default notifierSlice.reducer