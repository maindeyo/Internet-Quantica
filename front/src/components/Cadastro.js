// import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// import React, { useState } from 'react';
// import api from "../services/api";
// import '../css/CustomModal.css';

// const CustomCadastro = ({ show, onHide }) => {
//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');

//   const handleCadastro = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/signup', { nome, email, senha });
//       localStorage.setItem('token', response.data.token);
//       console.log('Cadastro bem-sucedido:', response.data);
//       onHide();
//     } catch (error) {
//       console.error('Erro no cadastro:', error);
//       if (error.response) {
//         console.error('Detalhes do erro da resposta:', error.response.data); 
//       }
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered size="md">
//       <Modal.Header closeButton>
//         <Modal.Title>Cadastro</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleCadastro}>
//           <Form.Group controlId="signinName" className="mb-3">
//             <Form.Label>Nome</Form.Label>
//             <Form.Control 
//               name='nome' 
//               type="text" 
//               placeholder="Digite seu nome" 
//               value={nome} 
//               onChange={(e) => setNome(e.target.value)} 
//             />
//           </Form.Group>
//           <Form.Group controlId="signinEmail" className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control 
//               name='email' 
//               type="email" 
//               placeholder="Digite seu email" 
//               value={email} 
//               onChange={(e) => setEmail(e.target.value)} 
//             />
//             <Form.Text className="text-muted">
//               O email deve estar no formato: <strong>exemplo@dominio.com</strong>
//             </Form.Text>
//           </Form.Group>
//           <Form.Group controlId="signinPassword" className="mb-3">
//             <Form.Label>Senha</Form.Label>
//             <Form.Control 
//               name='senha' 
//               type="password" 
//               placeholder="Digite sua senha" 
//               value={senha} 
//               onChange={(e) => setSenha(e.target.value)} 
//             />
//             <Form.Text className="text-muted">
//               A senha deve conter no mínimo 6 caracteres.
//             </Form.Text>
//           </Form.Group>
//           <Button 
//             type="submit" 
//             className="w-100 mb-3" 
//             variant="outline-primary"
//             style={{ borderColor: "#007bff", color: "#007bff" }}
//           >
//             Cadastrar
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default CustomCadastro;

import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import api from "../services/api";
import "../css/CustomModal.css";

const CustomCadastro = ({ show, onHide }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({}); // Estado para armazenar os erros

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpa os erros anteriores

    try {
      const response = await api.post("/signup", { nome, email, senha });
      localStorage.setItem("token", response.data.token);
      console.log("Cadastro bem-sucedido:", response.data);
      onHide();
    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors); // Captura os erros do back-end
      } else {
        alert("Erro ao realizar o cadastro. Tente novamente.");
      }
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleCadastro}>
          <Form.Group controlId="signinName" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              isInvalid={!!errors.nome} // Adiciona estilo de erro
            />
            <Form.Control.Feedback type="invalid">
              {errors.nome?.[0]}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="signinEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.[0]}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              O email deve estar no formato:{" "}
              <strong>exemplo@dominio.com</strong>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="signinPassword" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              isInvalid={!!errors.senha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.senha?.[0]}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              A senha deve conter no mínimo 6 caracteres.
            </Form.Text>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 mb-3"
            variant="outline-primary"
            style={{ borderColor: "#007bff", color: "#007bff" }}
          >
            Cadastrar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CustomCadastro;

