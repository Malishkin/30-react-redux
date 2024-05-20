import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../redux/books/actionCreators.js";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books); //name of redoser books
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
          <ul>
            {
                books.map((book, i) => (
                    <li key={book.id}>
                        
                          {++i}  {book.title}
                      
                            <strong> {book.author}</strong>
                       
                       <div className="book-actions"> <button onClick={() => handleDelete(book.id)}>Delete</button></div>
                    </li>
                ))
            }
       
            </ul>
      )}
    </div>
  );
};

export default BookList;
