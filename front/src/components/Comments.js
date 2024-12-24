// import { useEffect, useState } from 'react';
// import api from '../services/api';
// import { jwtDecode } from 'jwt-decode';
// import UnloggedComment from './UnloggedComment'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/Comments.css';

// const Comentarios = () => {
//   const [comentarios, setComentarios] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [comentario, setComentario] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded.sub);
//       } catch (error) {
//         console.error("Erro ao decodificar o token:", error);
//       }
//     }

//     api.get('/comments', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         setComentarios(response.data);
//       })
//       .catch((error) => {
//         console.error('Erro ao carregar os comentários:', error);
//         alert('Erro ao carregar os comentários: ' + error.message);
//       });
//   }, [token]);

//   const handleComment = (e) => {
//     e.preventDefault();

//     if (!token) {
//       setShowModal(true); 
//       return;
//     }

//     if (!comentario.trim()) {
//       alert("O comentário não pode estar vazio.");
//       return;
//     }

//     const data = {
//       content: comentario,
//       usu_id: userId,
//     };

//     api.post('/comments', data, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((response) => {
//         alert('Comentário criado com sucesso!');
//         setComentarios([...comentarios, response.data.comment]);
//         setComentario('');
//       })
//       .catch((error) => {
//         console.error('Erro ao criar comentário:', error.response?.data || error);
//         alert('Erro ao criar comentário.');
//       });
//   };

//   const handleCloseModal = () => setShowModal(false); 

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           <div className="list-group list-comments">
//             {comentarios.length > 0 ? (
//               comentarios.map((com, index) => (
//                 <div key={index} className="list-group-item mb-3">
//                   <p><strong>{com.usu_nome}</strong>: {com.content}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="list-group-item">
//                 <p><strong>Nenhum comentário disponível.</strong></p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="form-container">
//             <form onSubmit={handleComment}>
//               <div className="mb-3">
//                 <textarea
//                   className="form-control"
//                   placeholder="Digite seu comentário..."
//                   value={comentario}
//                   onChange={(e) => setComentario(e.target.value)}
//                   rows="8"  
//                 />
//               </div>
//               <button type="submit" className="button btn w-100">Enviar</button>
//             </form>
//           </div>
//         </div>
//       </div>

//       <UnloggedComment showModal={showModal} handleClose={handleCloseModal} />
//     </div>
//   );
// };

// export default Comentarios;

import { useEffect, useState } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
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
    if (token) {
      api.get('/id', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUserId(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar o userId:', error);
        });
  
      api.get('/comments', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setComentarios(response.data);
        })
        .catch((error) => {
          console.error('Erro ao carregar os comentários:', error);
          alert('Erro ao carregar os comentários: ' + error.message);
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
        alert('Comentário criado com sucesso!');
        setComentarios([...comentarios, response.data.comment]);
        setComentario('');
      })
      .catch((error) => {
        console.error('Erro ao criar comentário:', error.response?.data || error);
        alert('Erro ao criar comentário.');
      });
  };

  const handleDelete = (id) => {
    api.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        alert('Comentário excluído com sucesso!');
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
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(com.id);
                      }}
                      className="text-danger"
                    >
                      Excluir
                    </a>
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
              <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
          </div>
        </div>
      </div>

      <UnloggedComment showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Comentarios;
