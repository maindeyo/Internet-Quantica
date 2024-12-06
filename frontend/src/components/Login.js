import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import api from "../services/api";
import '../css/CustomModal.css';
import CustomCadastro from './Cadastro';  // Certifique-se de que o CustomCadastro esteja correto

const LoginModal = ({ show, onHide }) => {
  const [modalCadastro, setModalCadastroShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      console.log('Login bem-sucedido:', response.data);
      // Aqui você pode fazer o que quiser após o login, como redirecionar ou salvar o token
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <>
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
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control 
                    name='email' 
                    type="email" 
                    placeholder="Digite seu email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control 
                    name='password' 
                    type="password" 
                    placeholder="Digite sua senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </Form.Group>

                <Button type="submit" className="w-100 mb-3">
                  Entrar
                </Button>
              </Form>

              <hr />

              <div className="d-flex justify-content-center">
                <Button variant="link" onClick={() => setModalCadastroShow(true)}>
                  Cadastrando-se pela primeira vez? Faça uma conta!
                </Button>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <CustomCadastro show={modalCadastro} onHide={() => setModalCadastroShow(false)} />
    </>
  );
};

export default LoginModal;
