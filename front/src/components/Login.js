import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import "../css/CustomModal.css";
import CustomCadastro from "./Cadastro";

const LoginModal = ({ show, onHide }) => {
  const [modalCadastro, setModalCadastroShow] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    api
      .post("/login", { email, senha })
      .then((response) => {
        console.log("Login bem-sucedido:", response.data);
        localStorage.setItem("token", response.data.token);
        onHide(); 
      })
      .catch((error) => {
        console.error("Erro no login:", error);
        alert(
          "Erro ao realizar o login. Verifique suas credenciais e tente novamente."
        );
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                O email deve estar no formato: <strong>exemplo@dominio.com</strong>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                name="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <Form.Text className="text-muted">
                A senha deve conter no mínimo 6 caracteres.
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3">
              Entrar
            </Button>
          </Form>
          <div className="text-center">
          <Button className="w-100 mb-3" onClick={() => { setModalCadastroShow(true); onHide(); }}> 
            Cadastre-se
          </Button>
          </div>
        </Modal.Body>
      </Modal>

      <CustomCadastro
        show={modalCadastro}
        onHide={() => setModalCadastroShow(false)}
      />
    </>
  );
};

export default LoginModal;
