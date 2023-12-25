import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container } from "react-bootstrap";
import EditBookModal from "./EditBookModal";
import { DeleteBook } from "../../app/services/BooksApi";

interface Book {
  id: number;
    books?: any; 
    setBooks?: any; 
    key?: number; 
    setAlertMessage: any
}

interface BookCardProps extends Book {}

const BookCard: React.FC<BookCardProps> = ({
  id,
  books,
  setBooks,
  key,
  setAlertMessage
}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteBook = () => {
    DeleteBook(id)
    .then((response) => {
      console.log("delete response***", response.data.data);
      setBooks(response.data.data);
      setAlertMessage("Book Deleted Successfully")
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  return (
    <>
      <Card key={key} className="mx-5 my-4">
        <Card.Body className="d-flex justify-content-left">
          <Container>
            <Row>
              <Col xs={5} className="d-flex justify-content-left">
                <h6>{books.title}</h6>
              </Col>
              <Col xs={5} className="d-flex justify-content-left">
                <p style={{ color: "#b4becf" }}>{books.genre}</p>
              </Col>
              <Col>
                <div className="d-flex justify-content-end mr-3">
                  <Button variant="primary" onClick={handleShow}>
                    Edit
                  </Button>
                </div>
                <EditBookModal
                  id={id}
                //   books={books}
                  show={show}
                  handleClose={handleClose}
                  handleShow={handleShow}
                  setAlertMessage={setAlertMessage}
                />
              </Col>
              <Col>
                <div className="d-flex justify-content-end mr-3">
                  <Button variant="primary" onClick={handleDeleteBook}>
                    Delete
                  </Button>
                </div>
              </Col>

            </Row>
            <Row>
              <Col className="d-flex justify-content-left">
                <p style={{ color: "#b4becf" }}>{books.author}</p>
                <p>, {books.publication_year}</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;
