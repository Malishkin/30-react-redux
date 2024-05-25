import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setTitleFilter(state, action) {
      return {
        ...state,
        title: action.payload,
      };
    },
  },
});

console.log(filterSlice.actions);
console.log(filterSlice.actions.setTitleFilter({ payload: "test" }));
export default filterSlice.reducer;
