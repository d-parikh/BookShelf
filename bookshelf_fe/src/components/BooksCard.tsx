import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Container } from "react-bootstrap";
import EditBookModal from "./BooksComponent/EditBookModal";
import { DeleteBook } from "../app/services/BooksApi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DeleteBookModal from "./BooksComponent/DeleteBookModal";

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

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // const handleClose = () => setShowEditModal(false);
  // const handleShow = () => setShowEditModal(true);

  const handleDeleteBook = () => {
    DeleteBook(id)
    .then((response) => {
      setBooks(response.data.data);
      setAlertMessage("Book Deleted Successfully")
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  return (
    <>
      <div>
        <Card key={key} className="my-4 border-0 " style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',}}>
          <Card.Body className="d-flex justify-content-left">
            <Container>
              <Row>
                <Col xs={5} className="d-flex justify-content-left">
                  <h3 style={{color: "#489cb5"}}>{books.title}</h3>
                </Col>
                <Col xs={5} className="d-flex justify-content-left">
                  <p style={{ color: "#b4becf", fontWeight:600 }}>{books.genre}</p>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end mr-3">
                    <Button variant="success" onClick={()=>setEditModalVisible(true)}>
                      <AiFillEdit/>
                    </Button>
                  </div>
                  <EditBookModal
                    id={id}
                    show={editModalVisible}
                    handleClose={()=> setEditModalVisible(false)}
                    handleShow={()=>setEditModalVisible(true)}
                    setAlertMessage={setAlertMessage}
                  />
                </Col>
                <Col>
                  <div className="d-flex justify-content-end mr-3">
                    <Button variant="danger" onClick={()=>setDeleteModalVisible(true)}>
                      <AiFillDelete/>
                    </Button>
                  </div>
                  <DeleteBookModal
                    id={id}
                    show={deleteModalVisible}
                    handleClose={()=>setDeleteModalVisible(false)}
                    handleShow={()=>setDeleteModalVisible(true)}
                    setAlertMessage={setAlertMessage}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={5} className="d-flex justify-content-left">
                  <p style={{ color: "#55595c" }}>{books.author !== 'Unknown' ? books.author : '-'}</p>
                </Col>
                <Col xs={5} className="d-flex justify-content-left">
                  <p style={{color:"#55595c"}}>Published on : {books.publication_year ? books.publication_year: '-'}</p>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default BookCard;
