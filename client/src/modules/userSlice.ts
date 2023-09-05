import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  login: {
    isLogin: boolean;
    memberId: number;
    name: string;
    phone: number;
    address: string;
    email: string;
    nickName: string;
    body: string;
    photo: string;
    petsitterBoolean: boolean;
  };
}

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
    body: null,
    photo: null,
    petsitterBoolean: null,
  },
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    setUser: (state, action) => {
      state.memberId = action.payload.memberId;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.email = action.payload.email;
      state.nickName = action.payload.nickName;
      state.body = action.payload.body;
      state.body = action.payload.photo;
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
