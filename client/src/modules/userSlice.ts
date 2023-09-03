import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    memberId: null,
    email: null,
    displayName: null,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    setUser: (state, action) => {
      state.memberId = action.payload.memeberId;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
    },
    deleteUser: (state) => {
      state.isLogin = false;
      state.memberId = null;
      state.email = null;
      state.displayName = null;
    },
  },
});

export const { login, setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;
