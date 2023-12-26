import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Dropdown, Pagination, Row } from "react-bootstrap";
import { GetBooksList, GetFilteredBookList, GetSortedBookList } from "../app/services/BooksApi";
import BookCard from "../components/BooksCard";
import AddBookModal from "../components/BooksComponent/AddBookModal";
import { UserTokenContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaFilter } from "react-icons/fa6";

interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  genre: string;
}

const BooksList: React.FC = () => {
  const contextValue = useContext(UserTokenContext);
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
    GetSortedBookList(sortby)
    .then((response) => {
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  const handleFilter = (genre: string) =>{
    GetFilteredBookList(genre)
    .then((response) => {
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
    });
  }

  const fetchBooks = () => {
    GetBooksList()
    .then((response) => {
      setBooks(response?.data?.data);
    })
    .catch((error) => {
      console.log("api error***", error);
  });
  }
  const showAlert = (alertMessage: any) => {
    setAlertMessage(alertMessage);
    // Set a timeout to clear the alert after 3 seconds
    setTimeout(() => {
      setAlertMessage('');
    }, 3000);
  };

  useEffect(() => {
    fetchBooks();
    showAlert(alertMessage)
  }, [alertMessage]);

  return (
    <>
    <div className="mx-5 my-4">
      <div className="d-flex justify-content-space-between mb-4">
        <h1 className="d-flex justify-content-start">List of Books</h1>
        <Header linkColor="#3b373a"/>
      </div>
        <div className="d-flex justify-content-between mr-3">
          <div className="d-flex">
            <Dropdown className="mx-3">
              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: "#062236", borderWidth: 0}}>
                Sort By
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortBy('publication_year')}>Publication Year</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{backgroundColor: "#062236", borderWidth: 0}}>
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
          <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#dbd80b", borderWidth:0}}>
            Add Book
          </Button>
          <AddBookModal
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
            setAlertMessage={setAlertMessage}
          />
        </div>


        <div className="d-flex justify-content-center my-4">
          {alertMessage ? (
            <>
              <Alert variant="success" className="py-2">
                {alertMessage}
              </Alert>
            </>
          ):null}
        </div>

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
          <div style={{height: "100vh"}}>
            <h3 style={{color:"red"}}>No books available</h3>
          </div>
        )}

      {/* Pagination */}
      <div className="d-flex justify-content-end">
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
      </div>
    </div>


    </>
  );
};

export default BooksList;