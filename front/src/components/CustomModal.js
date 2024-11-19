import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import api from "../services/api";
import '../css/CustomModal.css'


const CustomModal = ({ show, onHide }) => {
  const[modalCadastro, setModalCadastroShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img src="https://networkpages.nl/wp-content/uploads/2019/01/ibm-quantum-computer-3.jpg" alt="Login" className="img-fluid" style={{ maxHeight: '300px' }} />
          </Col>
        
          <Col md={6}>
            <Form>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name='email' type="email" placeholder="Digite seu email" />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control name='password' type="password" placeholder="Digite sua senha" />
              </Form.Group>

              <Button type="submit" className="w-100 mb-3">
                Entrar
              </Button>
{/* 
              <div className="d-flex justify-content-center">
                <Button variant="secondary" onClick={onHide} className="me-2">
                  Fechar
                </Button>
              </div> */}
            </Form>

            <hr />

            <div className="d-flex justify-content-center">
              <Button variant="link" onClick={() => setModalCadastroShow(true)}>Cadastrando-se pela primeira vez? Faça uma conta!</Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <CustomCadastro show={modalCadastro} onHide={() => setModalCadastroShow(false)} />
    </Modal>
    
  );
};

const CustomCadastro = ({ show, onHide }) =>{
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  return(
    <Modal show={show} onHide={onHide} centered size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Cadastro</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img src="https://networkpages.nl/wp-content/uploads/2019/01/ibm-quantum-computer-3.jpg" alt="Login" className="img-fluid" style={{ maxHeight: '300px' }} />
        </Col>
        
        <Col md={6}>
          <Form>
          <Form.Group controlId="signinName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control name='name' type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              
            <Form.Group controlId="signinEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name='email' type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="signinPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control name='password' type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button type="submit" className="w-100 mb-3">
              Cadastrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
  );
};

export default CustomModal;