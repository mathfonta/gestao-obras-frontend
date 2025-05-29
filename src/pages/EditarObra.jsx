// src/pages/EditarObra.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditarObra() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [obra, setObra] = useState({
    nome: '',
    descricao: '',
    data_inicio: '',
    data_fim: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/obras/${id}`)
      .then(res => setObra(res.data))
      .catch(err => console.error('Erro ao buscar obra:', err));
  }, [id]);

  const handleChange = (e) => {
    setObra({ ...obra, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/obras/${id}`, obra)
      .then(() => navigate('/listar-obras'))
      .catch(err => alert('Erro ao atualizar obra'));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Obra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" value={obra.nome} onChange={handleChange} placeholder="Nome da Obra" className="w-full border p-2" />
        <textarea name="descricao" value={obra.descricao} onChange={handleChange} placeholder="Descrição" className="w-full border p-2"></textarea>
        <input name="data_inicio" value={obra.data_inicio} onChange={handleChange} type="date" className="w-full border p-2" />
        <input name="data_fim" value={obra.data_fim} onChange={handleChange} type="date" className="w-full border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}

export default EditarObra;
