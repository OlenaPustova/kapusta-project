import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: null,
      balance: null,
      id: null,
    },
    sid: null,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {},
});

export default authSlice.reducer;
