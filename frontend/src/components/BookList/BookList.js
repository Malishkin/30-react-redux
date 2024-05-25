import { useSelector, useDispatch } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import { selectTitleFilter } from "../../redux/slices/filterSlice.js";

import {
  deleteBook,
  toggleFavourite,
} from "../../redux/books/actionCreators.js";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books); //name of redoser books
  const titleFilter = useSelector(selectTitleFilter);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    console.log("title: ", book.title, matchesTitle);
    return matchesTitle;
  });
  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              {++i} {book.title}
              <strong> {book.author}</strong>
              <div className="book-actions">
                <span
                  className="star-icon"
                  onClick={() => handleToggleFavourite(book.id)}
                >
                  {book.isFavourite ? (
                    <BsBookmarkStarFill />
                  ) : (
                    <BsBookmarkStar />
                  )}
                </span>

                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
