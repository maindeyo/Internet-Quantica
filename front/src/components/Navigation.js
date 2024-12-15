import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'react-bootstrap';
import LoginModal from './Login'; 
import '../css/Navigation.css';
import api from "../services/api";

export default function Navigation() {
  const [modalShow, setModalShow] = useState(false);
  const token = localStorage.getItem('token'); 

  function handleLogout() {
    localStorage.removeItem("token")
    // api
    //   .post(
    //     "/logout", 
    //     {}, 
    //     {
    //       headers: { Authorization: `Bearer ${token}` }, 
    //     }
    //   )
    //   .then(() => {
    //     alert("Você saiu com sucesso!");
    //     localStorage.removeItem("token");
    //     // navigate("/"); 
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert("Erro ao tentar deslogar.");
    //   });
  }

  return (
    <>
      <Navbar
        className="navbar navbar-expand-md navbar-dark fixed-top custom-navigation-color pb-10"
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
              <Nav.Link href="#physic-section" className="px-3">Física Clássica vs Física Quântica</Nav.Link>
              <Nav.Link href="#quantum-computing" className="px-3">Computadores Quânticos</Nav.Link>
              <Nav.Link href="#pricing" className="px-3">Internet Quântica e Criptografia Quântica</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {token ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="user-dropdown">
                    <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link onClick={() => setModalShow(true)} className="px-3">
                  <FontAwesomeIcon icon={faRightToBracket} className="me-2" /> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
