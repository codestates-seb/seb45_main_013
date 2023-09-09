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
    memberId: '',
    name: '',
    phone: '',
    address: '',
    email: '',
    nickName: '',
    body: '',
    photo: '',
    petsitterBoolean: '',
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
      state.photo = action.payload.photo;
      state.petsitterBoolean = action.payload.petsitterBoolean;
    },
    deleteUser: (state) => {
      state.isLogin = false;
      state.memberId = '';
      state.name = '';
      state.phone = '';
      state.address = '';
      state.email = '';
      state.nickName = '';
      state.body = '';
      state.photo = '';
      state.petsitterBoolean = '';
    },
  },
});

export const { login, setUser, deleteUser } = loginSlice.actions;
export default loginSlice.reducer;
