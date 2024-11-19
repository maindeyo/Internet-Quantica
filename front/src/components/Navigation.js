import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import CustomModal from './CustomModal'; 
// import CustomCadastro from './CustomModal';

export default function Navigation() {
  const [modalShow, setModalShow] = useState(false);
  // const[modalCadastro, setModalCadastroShow] = useState(false);

  return (
    <>
      <Navbar className='custom-navigation-color' expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <FontAwesomeIcon icon={faAtom} /> Internet Quântica
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link onClick={() => setModalShow(true)}>
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomModal show={modalShow} onHide={() => setModalShow(false)} />
      {/* <CustomCadastro show={modalCadastro} onHide={() => setModalCadastroShow(false)} /> */}
    </>
  );
}
