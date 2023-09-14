import { createSlice } from '@reduxjs/toolkit';

export interface IPetAdd {
  reservation: {
    petId: string;
  };
}

export const petaddSlice = createSlice({
  name: 'petadd',
  initialState: {
    petId: [], // 초기값은 빈 배열
  },
  reducers: {
    setPetAdd: (state, action) => {
      state.petId.push = action.payload.petId;
    },
    deletePetAdd: (state) => {
      state.petId = state.petId.filter((petId) => petId !== state.petId);
    },
  },
});

export const { setPetAdd, deletePetAdd } = petaddSlice.actions;
export default petaddSlice.reducer;
