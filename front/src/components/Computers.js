import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import data from '../data/data.json'; // Ajuste conforme o caminho correto


const Computers = () => {
  const cards = data.computers;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ color: '#083654', fontWeight: 'bold' }}>
          Computadores Quânticos
        </h2>
        <Row className="g-4">
          {cards.map((card, index) => (
            <Col key={index} xs={12} sm={6} lg={4}>
              <Card className="h-100 shadow-sm" style={{ borderColor: '#083654' }}>
                <Card.Img
                  variant="top"
                  src={card.img}
                  alt={card.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title style={{ color: '#083654', fontWeight: 'bold' }}>
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
