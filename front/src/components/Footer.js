import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="Footer text-white py-4">
      <Container>
        <Row>
          <Col>
            <p className="mb-0"> © 2024 Internet Quântica. Todos os direitos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;