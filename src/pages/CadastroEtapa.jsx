// src/pages/CadastroEtapa.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CadastroEtapa() {
  const [etapa, setEtapa] = useState({
    id_obra: '',
    nome: '',
    descricao: '',
    data_inicio: '',
    data_fim: ''
  });
  const [obras, setObras] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/obras')
      .then(response => setObras(response.data))
      .catch(error => console.error('Erro ao carregar obras:', error));
  }, []);

  const handleChange = (e) => {
    setEtapa({ ...etapa, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/etapas', etapa);
      alert('Etapa cadastrada com sucesso!');
      setEtapa({ id_obra: '', nome: '', descricao: '', data_inicio: '', data_fim: '' });
    } catch (error) {
      console.error('Erro ao cadastrar etapa:', error);
      alert('Erro ao cadastrar etapa.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Cadastro de Etapa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="id_obra"
          value={etapa.id_obra}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione uma obra</option>
          {obras.map((obra) => (
            <option key={obra.id} value={obra.id}>{obra.nome}</option>
          ))}
        </select>

        <input
          type="text"
          name="nome"
          value={etapa.nome}
          onChange={handleChange}
          placeholder="Nome da etapa"
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="descricao"
          value={etapa.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="data_inicio"
          value={etapa.data_inicio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="data_fim"
          value={etapa.data_fim}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Cadastrar Etapa
        </button>
      </form>
    </div>
  );
}
