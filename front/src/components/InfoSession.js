import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from '../data/data.json'; // Ajuste conforme o caminho correto

const QuantumTechSection = () => {
  const InternetData = data.internet;
  const CriptoData = data.cripto;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
      <Container>
        <h2 className="text-center mb-5" style={{ color: '#083654', fontWeight: 'bold' }}>
          Internet Quântica e Criptografia Quântica
        </h2>
        <Row className="mb-5">
          <Col xs={12} md={6}>
            <img
              src={InternetData[0].img}
              alt="Internet Quântica"
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
        <Row>
          <Col xs={12} md={6}>
             <p style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {CriptoData[0].content}
            </p>
          </Col>
          <Col xs={12} md={6}>
            <img
              src={CriptoData[0].img}
              alt="Criptografia Quântica"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuantumTechSection;
