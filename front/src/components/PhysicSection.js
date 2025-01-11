
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from '../data/data.json';
import '../css/PhysicSection.css'; 

const PhysicSection = () => {
  const PhysiClassicData = data.physiclassic;
  const PhysiQuantumData = data.physicquantum;
  const [showClassic, setShowClassic] = useState(true);

  const showClassicText = () => setShowClassic(true);
  const showQuantumText = () => setShowClassic(false);

  return (
    <section id="physic-section">
      <Container>
        <Row className="mb-4">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center physic-content"
          >
            <h2 className="physic-title">
              {showClassic ? PhysiClassicData[0].title : PhysiQuantumData[0].title}
            </h2>
            <p className="physic-text">
              {showClassic ? PhysiClassicData[0].text : PhysiQuantumData[0].text}
            </p>
          </Col>

          <Col
            md={6}
            className="d-flex flex-column justify-content-start align-items-center"
          >
            <h3 className="cientists-title">
              Principais Cientistas
            </h3>
            <div className="cientists-container">
              {(showClassic ? PhysiClassicData[0].scientists : PhysiQuantumData[0].scientists).map((scientist, index) => (
                <div key={index} className="cientist-card">
                  <img
                    src={scientist.foto}
                    alt={scientist.nome}
                    className="cientist-img"
                  />
                  <p className="cientist-name">
                    {scientist.nome}
                  </p>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="button-container">
            <Button
              className={`physic-btn ${showClassic ? 'active' : ''}`}
              onClick={showClassicText}
            >
              Física Clássica
            </Button>
            <Button
              className={`physic-btn ${!showClassic ? 'active' : ''}`}
              onClick={showQuantumText}
            >
              Física Quântica
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PhysicSection;

