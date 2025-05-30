import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarPagamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pagamento, setPagamento] = useState({
    valor: '',
    data_pagamento: '',
    descricao: '',
    colaborador_id: '',
    obra_id: '',
    etapa_id: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/pagamentos/${id}`)
      .then(response => {
        setPagamento(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar pagamento:', error);
        alert('Erro ao carregar dados do pagamento.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPagamento(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/pagamentos/${id}`, pagamento)
      .then(() => {
        alert('Pagamento atualizado com sucesso!');
        navigate('/listar-pagamentos');
      })
      .catch(error => {
        console.error('Erro ao atualizar pagamento:', error);
        alert('Erro ao atualizar pagamento.');
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Pagamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="valor" value={pagamento.valor} onChange={handleChange} placeholder="Valor" className="w-full p-2 border rounded" required />
        <input type="date" name="data_pagamento" value={pagamento.data_pagamento?.slice(0, 10)} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="descricao" value={pagamento.descricao} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" />
        <input type="number" name="colaborador_id" value={pagamento.colaborador_id} onChange={handleChange} placeholder="ID do Colaborador" className="w-full p-2 border rounded" />
        <input type="number" name="obra_id" value={pagamento.obra_id} onChange={handleChange} placeholder="ID da Obra" className="w-full p-2 border rounded" />
        <input type="number" name="etapa_id" value={pagamento.etapa_id} onChange={handleChange} placeholder="ID da Etapa" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default EditarPagamento;
