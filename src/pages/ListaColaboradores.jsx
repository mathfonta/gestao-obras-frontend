import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaColaboradores() {
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
    const confirmacao = window.confirm('Tem certeza que deseja excluir este colaborador?');
    if (!confirmacao) return;

    try {
      await axios.delete(`http://localhost:3001/colaboradores/${id}`);
      setColaboradores(colaboradores.filter(colab => colab.id !== id));
    } catch (error) {
      console.error('Erro ao excluir colaborador:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Lista de Colaboradores</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nome</th>
            <th className="border px-4 py-2">Função</th>
            <th className="border px-4 py-2">Telefone</th>
            <th className="border px-4 py-2">PIX</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map(colab => (
            <tr key={colab.id}>
              <td className="border px-4 py-2">{colab.nome}</td>
              <td className="border px-4 py-2">{colab.funcao}</td>
              <td className="border px-4 py-2">{colab.telefone}</td>
              <td className="border px-4 py-2">{colab.chave_pix}</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 hover:underline mr-2" onClick={() => alert('Editar ainda não implementado')}>Editar</button>
                <button className="text-red-500 hover:underline" onClick={() => excluirColaborador(colab.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaColaboradores;
