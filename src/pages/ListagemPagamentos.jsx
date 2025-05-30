import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ListagemPagamentos() {
  const [pagamentos, setPagamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPagamentos();
  }, []);

  const carregarPagamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pagamentos');
      setPagamentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pagamentos:', error);
    }
  };

  const deletarPagamento = async (id) => {
    if (window.confirm('Deseja realmente excluir este pagamento?')) {
      try {
        await axios.delete(`http://localhost:3001/pagamentos/${id}`);
        alert('Pagamento excluído com sucesso!');
        carregarPagamentos();
      } catch (error) {
        console.error('Erro ao excluir pagamento:', error);
        alert('Erro ao excluir pagamento.');
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Pagamentos</h2>

      {/* Botão para novo pagamento */}
      <button
        onClick={() => navigate('/cadastro-pagamento')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Novo Pagamento
      </button>

      {/* Tabela */}
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Obra</th>
            <th className="border p-2">Etapa</th>
            <th className="border p-2">Colaborador</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Descrição</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map(p => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.nome_obra || '-'}</td>
              <td className="border p-2">{p.nome_etapa || '-'}</td>
              <td className="border p-2">{p.nome_colaborador || '-'}</td>
              <td className="border p-2">R$ {parseFloat(p.valor).toFixed(2)}</td>
              <td className="border p-2">{new Date(p.data_pagamento).toLocaleDateString()}</td>
              <td className="border p-2">{p.descricao}</td>
              <td className="border p-2 space-x-2">
                <Link
                  to={`/editar-pagamento/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deletarPagamento(p.id)}
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

export default ListagemPagamentos;
