import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import LoginModal from './Login'; 

export default function Navigation() {
  const [modalShow, setModalShow] = useState(false);

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
              <Nav.Link onClick={() => setModalShow(true)} className="px-3">
                <FontAwesomeIcon icon={faRightToBracket} className="me-2" /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
