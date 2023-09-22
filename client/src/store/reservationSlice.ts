import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IPet {
  name: string;
  age: number;
  petId: number;
  male: boolean;
  photo: string;
  species: string;
}

export interface IReservation {
  reservation: {
    reservationDay: string;
    reservationTimeStart: string;
    reservationTimeEnd: string;
    address: string;
    detailAddress: string;
    body: string;
    petId: number[];
    petsitterId: string;
    pets: IPet[];
  };
}

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservationDay: '',
    reservationTimeStart: '',
    reservationTimeEnd: '',
    address: '',
    body: '',
    petId: [],
    petsitterId: '',
    pets: [],
  },
  reducers: {
    setReservation: (state, action) => {
      state.reservationDay = action.payload.reservationDay;
      state.reservationTimeStart = action.payload.reservationTimeStart;
      state.reservationTimeEnd = action.payload.reservationTimeEnd;
      state.address = action.payload.address;
      state.petId = action.payload.petId;
      state.pets = action.payload.pets;
    },
    setPetsitterId: (state, action) => {
      state.petsitterId = action.payload;
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
      state.petsitterId = '';
      state.pets = [];
    },
  },
});

export const { setReservation, addBody, deleteReservation, setPetsitterId } = reservationSlice.actions;
export default reservationSlice.reducer;
