import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container } from 'react-bootstrap';

interface Book {
  id: number;
  key: number;
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
}

interface BookCardProps extends Book {
}

const BookCard: React.FC<BookCardProps> = ({ id, key, title, author, publicationYear, genre }) => {
  const [books, setBooks] = useState<Book | false>(false);

  return (
    <>
      <Card key={key} className='mx-5 my-4'>
        <Card.Body className="d-flex justify-content-left">
          <Container>
            <Row>
              <Col xs={5} className="d-flex justify-content-left">
                <h6>{title}</h6>
              </Col>
              <Col xs={6} className="d-flex justify-content-left">
                <p style={{ color: "#b4becf" }}>{genre}</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-left">
                <p style={{ color: "#b4becf" }}>{author}</p>
                <p>, {publicationYear}</p>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default BookCard;