import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/createBookWithId.js";
import { setError } from "./errorSlice.js";

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  "books/fetchBooks",
  async (url, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // OPTION 1
      return thunkAPI.rejectWithValue(error);

      // OPTION 2
      // throw error;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavourite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavourite = !book.isFavourite;
        }
      });
    },
  },

  //OPTION 1
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action?.payload?.author && action?.payload?.title) {
        state.books.push(createBookWithID(action.payload, "API"));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
  //OPTION 2
  // extraReducers: (builder) => {
  //   builder.addCase(fetchBook.pending, (state) => {
  //     state.isLoadingViaAPI = true;
  //   });
  //   builder.addCase(fetchBook.fulfilled, (state, action) => {
  //     state.isLoadingViaAPI = false;
  //     if (action.payload.author && action.payload.title) {
  //       state.books.push(createBookWithID(action.payload, "API"));
  //     }
  //   });
  //   builder.addCase(fetchBook.rejected, (state) => {
  //     state.isLoadingViaAPI = false;
  //   });
  // },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;
