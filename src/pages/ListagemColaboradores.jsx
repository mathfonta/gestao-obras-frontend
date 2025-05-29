// Atualizaremos a tela de ListagemColaboradores.jsx para incluir editar e excluir

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListagemColaboradores() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/colaboradores');
      setColaboradores(response.data);
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
    }
  };

  const excluirColaborador = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este colaborador?')) return;
    try {
      await axios.delete(`http://localhost:3001/colaboradores/${id}`);
      fetchColaboradores();
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Colaboradores Cadastrados</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Nome</th>
            <th className="py-2 px-4 border">Função</th>
            <th className="py-2 px-4 border">Telefone</th>
            <th className="py-2 px-4 border">PIX</th>
            <th className="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map((colab) => (
            <tr key={colab.id} className="border-t">
              <td className="py-2 px-4 border">{colab.nome}</td>
              <td className="py-2 px-4 border">{colab.funcao}</td>
              <td className="py-2 px-4 border">{colab.telefone}</td>
              <td className="py-2 px-4 border">{colab.chave_pix}</td>
              <td className="py-2 px-4 border flex gap-2 justify-center">
                {/* Botão de editar pode ser ligado a um modal futuramente */}
                <button
                  onClick={() => alert('Funcionalidade de edição ainda não implementada')}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => excluirColaborador(colab.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default ListagemColaboradores;
