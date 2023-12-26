import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteBook } from "../../app/services/BooksApi";
import { UserTokenContext } from "../../App";

interface DeleteBookModalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  setAlertMessage: any
}

const DeleteBookModal: React.FC<DeleteBookModalProps> = ({ id, show, handleClose, handleShow, setAlertMessage }) => {
    const contextValue = useContext(UserTokenContext);
    const userToken = contextValue?.userToken;
    const handleDeleteBook = () => {
        DeleteBook(userToken, id)
        .then((response) => {
          setAlertMessage("Book Deleted Successfully");
          handleClose();
        })
        .catch((error) => {
          console.log("api error***", error);
        });
      }
      const handleCloseMdal = () =>{
        handleClose()
    }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0 pb-0">
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete the book ?
        </Modal.Body>
        <Modal.Footer className="border-0 ">
          <Button variant="secondary" onClick={handleCloseMdal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteBook}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBookModal;
