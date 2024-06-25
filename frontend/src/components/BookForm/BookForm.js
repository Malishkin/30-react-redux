import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addBook } from "../../redux/slices/booksSlice.js";
import booksData from "../../data/books.json";
import createBookWithID from "../../utils/createBookWithId.js";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
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
    }
  };

  const handleAddRandomBookViaApi = async () => {
    try {
      const response = await axios.get("http://localhost:4000/random-book");
      if (response?.data?.author && response?.data?.title) {
        dispatch(addBook(createBookWithID(response.data, "API")));
      }
    } catch (error) {
      console.log("Error catching random book: ", error);
    }
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
        <button type="button" onClick={handleAddRandomBookViaApi}>
          Add Random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
