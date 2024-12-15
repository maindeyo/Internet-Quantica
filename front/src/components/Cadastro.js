import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import api from "../services/api";
import '../css/CustomModal.css';

const CustomCadastro = ({ show, onHide }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/signup', { nome, email, senha });
      console.log('Cadastro bem-sucedido:', response.data);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error.response) {
        console.error('Detalhes do erro da resposta:', error.response.data); 
      }
    }
  };

  return(
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <img 
              src="https://networkpages.nl/wp-content/uploads/2019/01/ibm-quantum-computer-3.jpg" 
              alt="Cadastro" 
              className="img-fluid" 
              style={{ maxHeight: '300px' }} 
            />
          </Col>
          <Col md={6}>
            <Form onSubmit={handleCadastro}>
              <Form.Group controlId="signinName" className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                  name='nome' 
                  type="text" 
                  placeholder="Digite seu nome" 
                  value={nome} 
                  onChange={(e) => setNome(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="signinEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  name='email' 
                  type="email" 
                  placeholder="Digite seu email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </Form.Group>
              <Form.Group controlId="signinPassword" className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control 
                  name='senha' 
                  type="password" 
                  placeholder="Digite sua senha" 
                  value={senha} 
                  onChange={(e) => setSenha(e.target.value)} 
                />
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

export default CustomCadastro;
