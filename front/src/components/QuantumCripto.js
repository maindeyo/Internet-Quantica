import React, { useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "../css/QuantumCripto.css";
import data from "../data/data.json";
import crypto from "crypto-js";

const QuantumCripto = () => {
  const [password, setPassword] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.trim() === "") {
      setEncryptedPassword("");
    } else {
      const hash = crypto.SHA256(inputPassword).toString();
      setEncryptedPassword(hash);
    }
  };

  const quantumCriptoData = data.quantumCripto[0];

  return (
    <section id="quantum-cripto" className="bg-light py-5">
      <Container>
        <h2 className="section-title text-center mb-5">
          Criptografia Quântica
        </h2>
        <Row>
          <Col xs={12} md={6}>
            <div className="image-text-wrapper">
              <img
                src={quantumCriptoData.img}
                alt="Criptografia Quântica"
                className="img-fluid custom-img"
              />
            </div>
          </Col>
          <Col xs={12} md={6}>
            <Card className="h-100 shadow-sm border-primary custom-card">
              <Card.Body>
                <Card.Title className="text-primary fw-bold text-center">
                  Veja como funciona a criptografia clássica!
                </Card.Title>
                <Form>
                  <Form.Group controlId="passwordInput">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite uma senha"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="encryptedPassword" className="mt-3">
                    <Form.Label>Senha Criptografada</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="A senha criptografada aparecerá aqui"
                      value={encryptedPassword}
                      readOnly
                    />
                  </Form.Group>
                </Form>
                <h4 className="observation mt-3 text-center">
                  Observação: Este site utiliza criptografia clássica (SHA-256) para fins de demonstração.
                </h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p className="text-content">{quantumCriptoData.content[0]}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QuantumCripto;
