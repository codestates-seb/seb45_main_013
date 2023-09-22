import { createSlice } from '@reduxjs/toolkit';

export interface IUser {
  user: {
    isLogin: boolean;
    memberId: number;
    petsitterId: number;
    name: string;
    phone: string;
    address: string;
    email: string;
    nickName: string;
    body: string;
    photo: string;
    petsitterBoolean: string;
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    memberId: '',
    petsitterId: '',
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
      state.petsitterId = action.payload.petsitterId;
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
      state.petsitterId = '';
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

export const { login, setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
