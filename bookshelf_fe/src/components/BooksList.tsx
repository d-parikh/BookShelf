import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import { GetBooksList, GetFilteredBookList, GetSortedBookList } from "../app/services/BooksApi";
import BookCard from "./BooksComponent/BooksCard";
import AddBookModal from "./BooksComponent/AddBookModal";
import { UserTokenContext } from "../App";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  genre: string;
}

const BooksList: React.FC = () => {
  const contextValue = useContext(UserTokenContext);
  console.log("dashboard***", contextValue?.userToken);
  const navigate = useNavigate();
  if(!contextValue?.userToken){
    navigate("/login");
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alertMessage, setAlertMessage] = useState<string | undefined>('');

  const [books, setBooks] = useState<Book[] | undefined>();

  const booksPerPage = 2; // Adjust the number of books per page as needed
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber:number) => setCurrentPage(pageNumber);

  const handleSortBy = (sortby: string) =>{
    console.log("sortby", sortby)
    GetSortedBookList(sortby)
    .then((response) => {
      console.log("api response***", response?.data?.data);
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  const handleFilter = (genre: string) =>{
    GetFilteredBookList(genre)
    .then((response) => {
      console.log("api response***", response?.data?.data);
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  const handleLogout = () =>{
    contextValue?.setToken('')
  }
  const fetchBooks = () => {
    GetBooksList()
    .then((response) => {
      console.log("api response***", response?.data?.data);
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
  });

  }
  useEffect(() => {
    console.log("alertMessage(***", alertMessage)
    fetchBooks();
  }, [alertMessage]);

  return (
    <>
      <h1>List of Books</h1>
      <div className="d-flex justify-content-end mr-3">
        <Button
            className="text-muted px-0"
            variant="link"
            onClick={handleLogout}
          >
            Logout
          </Button>
      </div>
      <div className="d-flex justify-content-end mr-3">
        <Button variant="primary" onClick={handleShow}>
          Add Book
        </Button>
        <AddBookModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setAlertMessage={setAlertMessage}
        />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSortBy('publication_year')}>Publication Year</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortBy('latest')}>Get the Latest books</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilter('Fantasy')}>Fantasy</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Horror')}>Horror</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Science and Fiction')}>Science and Fiction</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Romance')}>Romance</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Comedy')}>Comedy</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Thriller')}>Thriller</Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter('Adventure')}>Adventure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
      {alertMessage ? (
        <>
          <Alert variant="success" className="py-2">
            {alertMessage}
          </Alert>
        </>
      ):null}
      <Row>
        {currentBooks && currentBooks.length > 0 ? (
          currentBooks.map((item, index) => (
            <BookCard
              key={index}
              id={item.id}
              books={item}
              setBooks={setBooks}
              setAlertMessage={setAlertMessage}
            />
          ))
        ) : (
          <p>No books available</p>
        )}

      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
        <Pagination>
          {books &&
          // @ts-ignore
            [...Array(Math.ceil(books.length / booksPerPage)).keys()].map(
              (number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              )
          )}
      </Pagination>
        </Col>
      </Row>

    </>
  );
};

export default BooksList;