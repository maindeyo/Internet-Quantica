import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import data from '../data/data.json';

const PhysicSection = () => {
  const PhysiClassicData = data.physiclassic;
  const PhysiQuantumData = data.physicquantum;

  return (
    <section style={{ backgroundColor: "#ffffff", padding: "60px 0" }}>
      <Container>
        <Row className="mb-2">
          <Col>
            <h2 style={{ color: "#083654", fontWeight: "bold" }}>
              {PhysiClassicData[0].title}
            </h2>
            <p
              style={{
                textAlign: "justify",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              {PhysiClassicData[0].text}{" "}
            </p>
          </Col>
          <Col>
            <h2 style={{ color: "#083654", fontWeight: "bold" }}>
              {PhysiQuantumData[0].title}
            </h2>
            <p
              style={{
                textAlign: "justify",
                fontSize: "1.1rem",
                lineHeight: "1.6",
              }}
            >
              {PhysiQuantumData[0].text}{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default PhysicSection;