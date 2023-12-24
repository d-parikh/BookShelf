import React, { useEffect, useState } from "react";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import { GetBooksList } from "../app/services/BooksApi";
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

  const [books, setBooks] = useState<Book[] | undefined>();

  useEffect(() => {
    GetBooksList()
      .then((response) => {
        console.log("api response***", response.data.data);
        setBooks(response.data.data);
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
      </div>
      <AddBookModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      <Row>
        {books &&
          books.map((item, index) => (
            <BookCard
              id={item.id}
              key={index}
              title={item.title}
              author={item.author}
              publicationYear={item.publication_year}
              genre={item.genre}
            />
          ))}
      </Row>
    </>
  );
};

export default BooksList;
