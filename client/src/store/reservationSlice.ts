import { createSlice } from '@reduxjs/toolkit';

export interface IReservation {
  reservation: {
    reservationDay: string;
    reservationTimeStart: string;
    reservationTimeEnd: string;
    address: string;
    body: string;
    petId: number[];
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
    petId: [],
  },
  reducers: {
    setReservation: (state, action) => {
      state.reservationDay = action.payload.reservationDay;
      state.reservationTimeStart = action.payload.reservationTimeStart;
      state.reservationTimeEnd = action.payload.reservationTimeEnd;
      state.address = action.payload.address;
      state.petId = action.payload.pets;
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
      state.petId = [];
    },
  },
});

export const { setReservation, deleteReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
