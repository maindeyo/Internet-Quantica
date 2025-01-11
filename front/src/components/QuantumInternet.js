import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/QuantumInternet.css'; 
import data from '../data/data.json';

const QuantumInternet = () => {
  const [qubitState, setQubitState] = useState('|0>'); 

  useEffect(() => {
    const interval = setInterval(() => {
      setQubitState(prevState => (prevState === '|0>' ? '|1>' : '|0>')); 
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section id="quantum-internet" className="bg-light py-5">
      <Container>
        <h2 className="section-title text-center mb-5">
          Internet Quântica
        </h2>
        <Row>
          <Col xs={12} md={6}>
            {data.quantumInternet.map((item) => (
              <div key={item.id} className="image-text-wrapper"> 
                <img src={item.img} alt="Quantum State" className="img-fluid mb-3 text-aligned-img custom-img" />
                <p className="text-content">{item.content}</p>
              </div>
            ))}
          </Col>
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm border-primary">
              <Card.Body>
                {/* Centralizando o título */}
                <Card.Title className="text-primary fw-bold text-center">Comportamento dos Estados Quânticos</Card.Title>
                
                {/* Justificando o texto */}
                <Card.Text className="text-justify">
                  {data.quantumInternet[0].cardInfo} 
                </Card.Text>

                <div className="quantum-state-visualization">
                  <div className="bit-classic">
                    <h5>Bit Clássico</h5>
                    <div className="circle">{'0|1'}</div>
                    <p>O bit clássico está em um estado fixo (0 ou 1).</p>
                  </div>

                  <div className="qubit">
                    <h5>Qubit</h5>
                    <div className="circle">{qubitState}</div>
                    <p>O qubit está em superposição de estados, alternando entre |0{'>'} e |1{'>'}.</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuantumInternet;

