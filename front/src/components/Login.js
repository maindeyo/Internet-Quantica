import React, { useState } from "react"; //login
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import "../css/CustomModal.css";
import CustomCadastro from "./Cadastro";

const LoginModal = ({ show, onHide }) => {
  const [modalCadastro, setModalCadastroShow] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await api.post("/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      window.location.reload();

      onHide();
    } catch (error) {
      console.error("Erro no login:", error);
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Erro ao realizar o login. Tente novamente mais tarde.");
      }
    }
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

            {errorMessage && (
              <div className="text-danger mb-3 text-center">
                {errorMessage}
              </div>
            )}

            <Button type="submit" className="w-100 mb-3">
              Entrar
            </Button>
          </Form>
          <div className="text-center">
            <Button
              className="w-100 mb-3"
              onClick={() => {
                setModalCadastroShow(true);
                onHide();
              }}
            > Não tem uma conta? Cadastre-se aqui!
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

