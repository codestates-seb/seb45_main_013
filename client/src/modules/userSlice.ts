import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogin: false,
    memberId: null,
    name: null,
    phone: null,
    address: null,
    email: null,
    nickName: null,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    setUser: (state, action) => {
      state.memberId = action.payload.memeberId;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.nickName = action.payload.displayName;
    },
    deleteUser: (state) => {
      state.isLogin = false;
      state.memberId = null;
      state.email = null;
      state.nickName = null;
    },
  },
});

export const { login, setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;
