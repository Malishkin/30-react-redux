import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      //   const index = state.findIndex((book) => book.id === action.payload);
      //   if (index !== -1) {
      //     state.splice(
      //       state.findIndex((book) => book.id === action.payload),
      //       1
      //     );
      //   }
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavourite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
      });
      //   return state.map((book) =>
      //     book.id === action.payload
      //       ? { ...book, isFavourite: !book.isFavourite }
      //       : book
      //   );
    },
  },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
