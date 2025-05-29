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
      .then(response => {
        setObra(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados da obra:', error);
        alert('Erro ao carregar dados da obra.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setObra(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/obras/${id}`, obra)
      .then(() => {
        alert('Obra atualizada com sucesso!');
        navigate('/listar-obras');
      })
      .catch(error => {
        console.error('Erro ao atualizar obra:', error);
        alert('Erro ao atualizar obra.');
      });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Obra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nome" value={obra.nome} onChange={handleChange} placeholder="Nome da obra" className="w-full p-2 border rounded" required />
        <input type="text" name="descricao" value={obra.descricao} onChange={handleChange} placeholder="Descrição" className="w-full p-2 border rounded" required />
        <input type="date" name="data_inicio" value={obra.data_inicio?.slice(0, 10)} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="data_fim" value={obra.data_fim?.slice(0, 10)} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarObra;
