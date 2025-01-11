import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import data from '../data/data.json';
import "../css/Computers.css";

const Computers = () => {
  const cards = data.computers;

  return (
    <section id="quantum-computing" className="bg-white py-5">
      <Container>
        <h2 className="text-center mb-5 fw-bold">
          Computadores Quânticos
        </h2>
        <Row className="CardsComp g-4">
          {cards.map((card, index) => (
            <Col key={index} xs={12} sm={6} lg={4}>
              <Card className="h-100 shadow-sm border-primary">
                <Card.Img
                  variant="top"
                  src={card.img}
                  alt={card.title}
                  className="card-img-custom"
                />
                <Card.Body>
                  <Card.Title className="text-primary fw-bold">
                    {card.title}
                  </Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Computers;

