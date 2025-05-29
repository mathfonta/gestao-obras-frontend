import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CadastroPagamento() {
  const [valor, setValor] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [colaboradorId, setColaboradorId] = useState('');
  const [obraId, setObraId] = useState('');
  const [etapaId, setEtapaId] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [colaboradores, setColaboradores] = useState([]);
  const [obras, setObras] = useState([]);
  const [etapas, setEtapas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/colaboradores')
      .then(res => setColaboradores(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3001/obras')
      .then(res => setObras(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (obraId) {
      axios.get(`http://localhost:3001/etapas/por-obra/${obraId}`)
        .then(res => setEtapas(res.data))
        .catch(err => console.error(err));
    }
  }, [obraId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/pagamentos', {
        valor,
        data_pagamento: dataPagamento,
        colaborador_id: colaboradorId,
        obra_id: obraId,
        etapa_id: etapaId,
        observacoes
      });
      alert('Pagamento cadastrado com sucesso!');
      setValor('');
      setDataPagamento('');
      setColaboradorId('');
      setObraId('');
      setEtapaId('');
      setObservacoes('');
    } catch (error) {
      console.error('Erro ao cadastrar pagamento:', error);
      alert('Erro ao cadastrar pagamento.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Cadastro de Pagamento</h2>

      <div className="mb-4">
        <label className="block mb-1">Valor</label>
        <input type="number" step="0.01" value={valor} onChange={e => setValor(e.target.value)} required className="w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Data do Pagamento</label>
        <input type="date" value={dataPagamento} onChange={e => setDataPagamento(e.target.value)} required className="w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Colaborador</label>
        <select value={colaboradorId} onChange={e => setColaboradorId(e.target.value)} required className="w-full border rounded p-2">
          <option value="">Selecione</option>
          {colaboradores.map(col => (
            <option key={col.id} value={col.id}>{col.nome} - {col.funcao}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Obra</label>
        <select value={obraId} onChange={e => setObraId(e.target.value)} required className="w-full border rounded p-2">
          <option value="">Selecione</option>
          {obras.map(obra => (
            <option key={obra.id} value={obra.id}>{obra.nome}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Etapa</label>
        <select value={etapaId} onChange={e => setEtapaId(e.target.value)} required className="w-full border rounded p-2">
          <option value="">Selecione</option>
          {etapas.map(etapa => (
            <option key={etapa.id} value={etapa.id}>{etapa.nome}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Observações</label>
        <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} className="w-full border rounded p-2" rows="3" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Salvar Pagamento</button>
    </form>
  );
}

export default CadastroPagamento;