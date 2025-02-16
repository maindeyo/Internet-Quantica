import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./Login";
import CadastroModal from "./Cadastro";
import "../css/Navigation.css";
import api from "../services/api";

export default function Navigation() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCadastroModal, setShowCadastroModal] = useState(false);
  const token = localStorage.getItem("token");

  // localStorage.removeItem("token");

  function handleLogout() {
    api
      .post(
        "/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((error) => {
        alert("Erro ao tentar deslogar.");
        console.error("Erro de logout:", error.response ? error.response.data : error.message);
      });
  }

  return (
    <>
      <Navbar
        className="navbar navbar-expand-md navbar-dark fixed-top custom-navigation-color"
        expand="lg"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <FontAwesomeIcon icon={faAtom} className="me-2" /> Internet Quântica
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#physic-section" className="px-3">
                Física Clássica vs Física Quântica
              </Nav.Link>
              <Nav.Link href="#quantum-computing" className="px-3">
                Computadores Quânticos
              </Nav.Link>
              <Nav.Link href="#quantum-internet" className="px-3">
                Internet Quântica
              </Nav.Link>
              <Nav.Link href="#quantum-cripto" className="px-3">
                Criptografia Quântica
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {token ? (
                <Nav.Link
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                  className="text-light"
                >
                  Sair
                </Nav.Link>
              ) : (
                <div className="d-flex align-items-center">
                  <Nav.Link
                    onClick={() => setShowLoginModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </Nav.Link>
                  <span className="mx-2 text-light">|</span>
                  <Nav.Link
                    onClick={() => setShowCadastroModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    Cadastro
                  </Nav.Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
      <CadastroModal
        show={showCadastroModal}
        onHide={() => setShowCadastroModal(false)}
      />
    </>
  );
}
