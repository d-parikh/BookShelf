import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { EditBook, GetBook } from "../../app/services/BooksApi";

interface EditBookModalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ id, show, handleClose, handleShow }) => {
  const [books, setBooks] = useState<any>(false);
  const [error, setError] = useState<string | boolean>(false);

  const initialValues = {
    title: "",
    author: "",
    publication_year: "",
    genre: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("This is Required"),
    author: Yup.string().required("This is Required"),
    publication_year: Yup.string().required("This is Required"),
    genre: Yup.string(),
  });

  const onSubmit = (values: typeof initialValues, { setStatus, resetForm }: any) => {
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("author", values?.author);
    formData.append("publication_year", values?.publication_year);
    formData.append("genre", values?.genre);
    EditBook(id, formData)
      .then((response) => {
        console.log("API response:", response.data.data);
        setStatus({ success: true });
        setTimeout(() => {
          resetForm();
          handleClose();
        }, 3000);
      })
      .catch((error) => {
        console.log("API error:", error.response?.data?.message);
        setError(error.response?.data?.message || true);
        setStatus({ success: false });
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values, setValues, handleChange, handleSubmit, errors, touched } = formik;

  useEffect(() => {
    if (show) {
      GetBook(id).then((response) => {
        setBooks(response.data.data[0]);
        setValues({
          title: response.data.data[0].title,
          author: response.data.data[0].author,
          publication_year: response.data.data[0].publication_year,
          genre: response.data.data[0].genre,
        });

        console.log("****", response);
      });
    }
  }, [show, id]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-width-0 pb-0">
          <h3>Edit Book Details</h3>
        </Modal.Header>
        <Modal.Body>
          {formik.status && formik.status.success ? (
            <Alert variant="success" className="py-2">
              Book updated successfully!
            </Alert>
          ) : formik.status && !formik.status.success ? (
            <Alert variant="danger" className="py-2">
              {error}
            </Alert>
          ) : null}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Book Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                isInvalid={touched.title && !!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Author"
                name="author"
                value={values.author}
                onChange={handleChange}
                isInvalid={touched.author && !!errors.author}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="publication_year">
              <Form.Label>Publication Year</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Publication Year"
                name="publication_year"
                value={values.publication_year}
                onChange={handleChange}
                isInvalid={
                  touched.publication_year && !!errors.publication_year
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.publication_year}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Genre"
                name="genre"
                value={values.genre}
                onChange={handleChange}
                isInvalid={touched.genre && !!errors.genre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditBookModal;
