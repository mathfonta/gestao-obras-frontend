import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroPagamento() {
  const [valor, setValor] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [obraId, setObraId] = useState('');
  const [etapaId, setEtapaId] = useState('');
  const [colaboradorId, setColaboradorId] = useState('');
  const [obras, setObras] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    carregarObras();
    carregarColaboradores();
  }, []);

  const carregarObras = async () => {
    try {
      const res = await axios.get('http://localhost:3001/obras');
      setObras(res.data);
    } catch (error) {
      console.error('Erro ao carregar obras', error);
    }
  };

  const carregarColaboradores = async () => {
    try {
      const res = await axios.get('http://localhost:3001/colaboradores');
      setColaboradores(res.data);
    } catch (error) {
      console.error('Erro ao carregar colaboradores', error);
    }
  };

  const carregarEtapasDaObra = async (obraId) => {
    try {
      const res = await axios.get(`http://localhost:3001/etapas/obra/${obraId}`);
      setEtapas(res.data);
    } catch (error) {
      console.error('Erro ao carregar etapas', error);
    }
  };

  const handleObraChange = (e) => {
    const id = e.target.value;
    setObraId(id);
    carregarEtapasDaObra(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/pagamentos', {
        valor,
        data_pagamento: dataPagamento,
        descricao,
        obra_id: obraId,
        etapa_id: etapaId,
        colaborador_id: colaboradorId,
      });
      alert('Pagamento cadastrado com sucesso!');
      // limpar campos
      setValor('');
      setDataPagamento('');
      setDescricao('');
      setObraId('');
      setEtapaId('');
      setColaboradorId('');
      setEtapas([]);
    } catch (error) {
      console.error('Erro ao cadastrar pagamento:', error);
      alert('Erro ao cadastrar pagamento.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Cadastro de Pagamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Data de Pagamento:</label>
          <input
            type="date"
            value={dataPagamento}
            onChange={(e) => setDataPagamento(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block">Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Obra:</label>
          <select
            value={obraId}
            onChange={handleObraChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione uma obra</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Etapa:</label>
          <select
            value={etapaId}
            onChange={(e) => setEtapaId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione uma etapa</option>
            {etapas.map((etapa) => (
              <option key={etapa.id} value={etapa.id}>
                {etapa.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Colaborador:</label>
          <select
            value={colaboradorId}
            onChange={(e) => setColaboradorId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecione um colaborador</option>
            {colaboradores.map((col) => (
              <option key={col.id} value={col.id}>
                {col.nome} ({col.funcao})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar Pagamento
        </button>
      </form>
    </div>
  );
}

export default CadastroPagamento;
