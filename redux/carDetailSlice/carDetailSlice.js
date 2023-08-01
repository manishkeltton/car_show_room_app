import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  data: [],
  perPage: 5,
  currentPage: 0,
  pageCount: 0,
};

export const carMakeSlice = createSlice({
  name: "CarDetails",
  initialState,
  reducers: {
    carDetailsData: (state, action) => {
      state.data = action.payload;
    },
    carOffset: (state, action) => {
      state.offset = action.payload;
    },
    carCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    carPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { carDetailsData, carCurrentPage, carOffset, carPageCount } =
  carMakeSlice.actions;

export default carMakeSlice.reducer;
