import { useEffect, useState } from 'react';
import api from '../services/api'; 
import {jwtDecode} from 'jwt-decode'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [comentario, setComentario] = useState('');
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (token) {
      try {
        const tokenPayload = jwtDecode(token);
        const userId = tokenPayload.sub;
        console.log("User ID:", userId);
        setUserId(userId); 


        api.get(`/usuarios/${userId}/nome`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            setUserName(response.data.name); 
          })
          .catch((error) => {
            console.error('Erro ao carregar o nome do usuário:', error);
            alert('Erro ao carregar o nome do usuário: ' + error.message);
          });
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }


    api.get('/comments', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Comentários carregados:", response.data);
        setComentarios(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os comentários:', error);
        alert('Erro ao carregar os comentários: ' + error.message);
      });
  }, [token]);

  const handleComment = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Não é possível salvar um comentário sem estar logado.");
      return;
    }

    if (!comentario || comentario.trim() === '') {
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
        console.log(`Comentário criado com êxito: "${response.data.comment.content}"`);
        alert(`Comentário criado com êxito: "${response.data.comment.content}"`);

        setComentarios(prevComentarios => [...prevComentarios, response.data.comment]);
        setComentario(''); 
      })
      .catch((error) => {
        console.error('Erro ao criar comentário:', error.response.data);
        alert('Erro ao criar comentário: ' + error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Comentários</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="list-group">
            {comentarios.length > 0 ? (
              comentarios.map((com, index) => (
                <div key={index} className="list-group-item">
                  <p><strong>Usuário:</strong> {com.content}</p>
                </div>
              ))
            ) : (
              <div className="list-group-item">
                <p><strong>Sem comentários ainda.</strong></p>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleComment} className="mt-4">
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Digite seu comentário..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comentarios;
