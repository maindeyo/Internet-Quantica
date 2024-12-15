import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import data from '../data/data.json';

const PhysicSection = () => {
  const PhysiClassicData = data.physiclassic;
  const PhysiQuantumData = data.physicquantum;

  return (
    <section id="physic-section" className="py-5" style={{ backgroundColor: "#ffffff" }}>
      <Container>
        <Row className="mb-4">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center"
            style={{
              background: "linear-gradient(to right, #f0f4f8, #ffffff)",
              padding: "20px",
            }}
          >
            <h2 style={{ color: "#083654", fontWeight: "bold" }}>
              {PhysiClassicData[0].title}
            </h2>
            <p className="text-justify fs-5">{PhysiClassicData[0].text}</p>
          </Col>
          <Col
            md={6}
            className="d-flex flex-column justify-content-center"
            style={{
              background: "linear-gradient(to right, #e3f2fd, #ffffff)",
              padding: "20px",
            }}
          >
            <h2 style={{ color: "#083654", fontWeight: "bold" }}>
              {PhysiQuantumData[0].title}
            </h2>
            <p className="text-justify fs-5">{PhysiQuantumData[0].text}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PhysicSection;
