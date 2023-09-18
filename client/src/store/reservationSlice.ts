import { createSlice } from '@reduxjs/toolkit';

export interface IReservation {
  reservation: {
    reservationDay: string;
    reservationTimeStart: string;
    reservationTimeEnd: string;
    address: string;
    detailAddress: string;
    body: string;
    pets: number[];
  };
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservationDay: '',
    reservationTimeStart: '',
    reservationTimeEnd: '',
    address: '',
    detailAddress: '',
    body: '',
    pets: [],
  },
  reducers: {
    setReservation: (state, action) => {
      state.reservationDay = action.payload.reservationDay;
      state.reservationTimeStart = action.payload.reservationTimeStart;
      state.reservationTimeEnd = action.payload.reservationTimeEnd;
      state.address = action.payload.address;
      state.detailAddress = action.payload.detailAddress;
    },
    addPets: (state, action) => {
      state.pets = action.payload.pets;
    },
    addBody: (state, action) => {
      state.body = action.payload.body;
    },
    deleteReservation: (state) => {
      state.reservationDay = '';
      state.reservationTimeStart = '';
      state.reservationTimeEnd = '';
      state.address = '';
      state.body = '';
      state.pets = [];
    },
  },
});

export const { setReservation, addPets, deleteReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
