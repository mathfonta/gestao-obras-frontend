// Supondo que estamos na ListagemObras.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListagemObras() {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    carregarObras();
  }, []);

  const carregarObras = async () => {
    try {
      const response = await axios.get('http://localhost:3001/obras');
      setObras(response.data);
    } catch (error) {
      console.error('Erro ao carregar obras:', error);
    }
  };

  const deletarObra = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta obra?')) {
      try {
        await axios.delete(`http://localhost:3001/obras/${id}`);
        alert('Obra deletada com sucesso');
        carregarObras();
      } catch (error) {
        console.error('Erro ao deletar obra:', error);
        alert('Erro ao deletar obra');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Obras</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nome</th>
            <th className="border p-2">Início</th>
            <th className="border p-2">Fim</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id} className="text-center">
              <td className="border p-2">{obra.id}</td>
              <td className="border p-2">{obra.nome}</td>
              <td className="border p-2">{obra.data_inicio}</td>
              <td className="border p-2">{obra.data_fim}</td>
              <td className="border p-2 space-x-2">
                <Link
                  to={`/editar-obra/${obra.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deletarObra(obra.id)}
                  className="text-red-600 hover:underline"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListagemObras;
