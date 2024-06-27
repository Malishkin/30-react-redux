import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice.js";
import booksData from "../../data/books.json";
import createBookWithID from "../../utils/createBookWithId.js";
import { setError } from "../../redux/slices/errorSlice.js";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);

  const dispatch = useDispatch();
  const handleAddRandomBook = () => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];

    dispatch(addBook(createBookWithID(randomBook, "random")));
  };
  const handleSubmit = (e) => {
    //dispatch action to add book
    e.preventDefault();
    if (title && author) {
      dispatch(addBook(createBookWithID({ title, author }, "manual")));
      setTitle("");
      setAuthor("");
    } else {
      dispatch(setError("Please fill out both fields"));
    }
  };

  const handleAddRandomBookViaApi = () => {
    dispatch(fetchBook("http://localhost:4000/random-book-delayed"));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaApi}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Random Via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
