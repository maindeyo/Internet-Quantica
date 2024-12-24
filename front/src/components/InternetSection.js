import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import data from '../data/data.json';

const InternetSection = () => {
  const InternetData = data.internet;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ color: '#083654', fontWeight: 'bold' }}>
          Internet Quântica e Criptografia 
        </h2>
        <Row>
          <Col xs={12} md={6}>
            <img
              src={InternetData[0].img}
              alt="Imagem 1"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
            <p style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.6' }}>
              {InternetData[0].content}
            </p>
          </Col>
          <Col xs={12} md={6}>
            <p style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.6' }}>
              {InternetData[1].content}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InternetSection;
