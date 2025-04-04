// src/store/alertSlice.js
import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    message: '',
    severity: 'info', // Можно использовать 'error', 'success', 'warning' и т.д.
  },
  reducers: {
    setAlert(state, action) {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    clearAlert(state) {
      state.message = '';
      state.severity = 'info';
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;