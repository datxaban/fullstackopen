import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNoti(state, action) {
      return action.payload
    },
    clearNoti(state, action) {
      return ''
    },
  },
});

export const { setNoti, clearNoti } = notificationSlice.actions;

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(setNoti(content))
    setTimeout(() => dispatch(clearNoti()), time * 1000)
  }
}

export default notificationSlice.reducer;