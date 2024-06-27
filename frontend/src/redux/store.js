import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./slices/booksSlice";
import filterReducer from "./slices/filterSlice";
import errorSlice from "./slices/errorSlice";

const store = configureStore({
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorSlice,
  },
});

export default store;
