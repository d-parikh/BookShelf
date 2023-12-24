import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import { GetBooksList, GetSortedBookList } from "../app/services/BooksApi";
import BookCard from "./BooksComponent/BooksCard";
import AddBookModal from "./BooksComponent/AddBookModal";

interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  genre: string;
}

const BooksList: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [alertMessage, setAlertMessage] = useState(false);

  const [books, setBooks] = useState<Book[] | undefined>();
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

  useEffect(() => {
    GetBooksList()
      .then((response) => {
        console.log("api response***", response?.data?.data);
        setBooks(response?.data?.data);
      })
      .catch((error) => {
        console.log("api error***", error);
      });
  }, []);

  return (
    <>
      <h1>List of Books</h1>
      <div className="d-flex justify-content-end mr-3">
        <Button variant="primary" onClick={handleShow}>
          Add Book
        </Button>
        <AddBookModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
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
      </div>

      <Row>
        {books &&
          books.map((item, index) => (
            <BookCard
              id={item.id}
              books={item}
              setBooks={setBooks}
            />
          ))}
      </Row>
    </>
  );
};

export default BooksList;