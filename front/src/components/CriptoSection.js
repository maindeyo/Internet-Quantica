import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from '../data/data.json'; // Ajuste conforme o caminho correto

const CriptoSection = () => {
  const CriptoData = data.cripto;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '60px 0' }}>
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <img
              src={CriptoData[0].img}
              alt="Criptografia Quântica"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '500px', // Aumenta o tamanho máximo da altura da imagem
                objectFit: 'cover', // Preenche o espaço mantendo uma proporção agradável
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            <p style={{ textAlign: 'justify', fontSize: '1.1rem', lineHeight: '1.6' }}>
              {CriptoData[0].content}
            </p>
            <Button
              variant="primary"
              style={{
                marginTop: '20px',
                backgroundColor: '#083654',
                borderColor: '#083654',
                fontSize: '1rem',
                padding: '10px 20px',
              }}
              onClick={() => alert('Em breve, você poderá criptografar sua mensagem!')} // Substitua por sua funcionalidade
            >
              Criptografe sua mensagem
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CriptoSection;
