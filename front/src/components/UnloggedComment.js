import React, { useState } from "react";
import LoginModal from "./Login"; 
import CustomCadastro from "./Cadastro";
import { Modal, Button } from "react-bootstrap";

const UnloggedComment = ({ showModal, handleClose }) => {
  const [showLogin, setShowLogin] = useState(false);  
  const [showCadastro, setShowCadastro] = useState(false); 

  const handleShowLogin = () => {
    setShowLogin(true);
    handleClose();
  };

  const handleShowCadastro = () => {
    setShowCadastro(true);
    handleClose();
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você precisa estar logado para comentar. Por favor, faça login ou cadastre-se.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleShowLogin}>
            Login
          </Button>
          <Button variant="primary" onClick={handleShowCadastro}>
            Cadastro
          </Button>
        </Modal.Footer>
      </Modal>
      
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />

      <CustomCadastro show={showCadastro} onHide={() => setShowCadastro(false)} />
    </>
  );
};

export default UnloggedComment;
