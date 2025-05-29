// src/pages/ListarObras.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ListarObras() {
  const [obras, setObras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscarObras();
  }, []);

  const buscarObras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/obras');
      setObras(response.data);
    } catch (error) {
      console.error('Erro ao buscar obras:', error);
    }
  };

  const deletarObra = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta obra?')) return;
    try {
      await axios.delete(`http://localhost:3001/obras/${id}`);
      buscarObras();
    } catch (error) {
      console.error('Erro ao deletar obra:', error);
    }
  };

  const editarObra = (id) => {
    navigate(`/editar-obra/${id}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Listagem de Obras</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Descrição</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id}>
              <td className="border px-4 py-2">{obra.id}</td>
              <td className="border px-4 py-2">{obra.nome}</td>
              <td className="border px-4 py-2">{obra.descricao}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => editarObra(obra.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => deletarObra(obra.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarObras;
