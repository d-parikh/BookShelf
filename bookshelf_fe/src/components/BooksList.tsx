import React, { useEffect, useState } from "react";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import { GetBooksList } from "../app/services/BooksApi";
import BookCard from "./BooksComponent/BooksCard";

interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

const BooksList: React.FC = () => {
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
        {/* <Button variant="primary" onClick={}>
          Add Book
        </Button> */}
      </div>
      <Row>
        {books &&
          books.map((item, index) => (
            <BookCard
              id={item.id}
              key={index}
              title={item.title}
              author={item.author}
              publicationYear={item.publicationYear}
              genre={item.genre}
            />
          ))}
      </Row>
    </>
  );
};

export default BooksList;
