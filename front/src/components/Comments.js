

import { useEffect, useState } from 'react';
import api from '../services/api';
import UnloggedComment from './UnloggedComment'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Comments.css';

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [userId, setUserId] = useState('');
  const [comentario, setComentario] = useState('');
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get('/comments')
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os comentários:', error);
        alert('Erro ao carregar os comentários: ' + error.message);
      });

    if (token) {
      api.get('/id', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUserId(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar o userId:', error);
        });
    }
  }, [token]);

  const handleComment = (e) => {
    e.preventDefault();

    if (!token) {
      setShowModal(true);
      return;
    }

    if (!comentario.trim()) {
      alert("O comentário não pode estar vazio.");
      return;
    }

    const data = {
      content: comentario,
      usu_id: userId,
    };

    api.post('/comments', data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setComentarios([...comentarios, response.data.comment]);
        setComentario('');
      })
      .catch((error) => {
        console.error('Erro ao criar comentário:', error.response?.data || error);
        alert('Erro ao criar comentário.');
      });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este comentário?");
    if (!confirmDelete) return;

    api.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setComentarios(comentarios.filter(com => com.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao excluir comentário:', error.response?.data || error);
        alert('Erro ao excluir comentário.');
      });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="list-group list-comments">
            {comentarios.length > 0 ? (
              comentarios.map((com, index) => (
                <div key={index} className="list-group-item mb-3">
                  <p><strong>{com.usu_nome}</strong>: {com.content}</p>
                  {com.usu_id === userId && (
                    <div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(com.id);
                        }}
                        className="text-danger"
                      >
                        Excluir
                      </a>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="list-group-item">
                <p><strong>Nenhum comentário disponível.</strong></p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-container">
            <form onSubmit={handleComment}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Digite seu comentário..."
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  rows="8"
                />
              </div>
              <button type="submit" className="btn custom-button-color w-100">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <UnloggedComment showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Comentarios;

