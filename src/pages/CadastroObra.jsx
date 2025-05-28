import React, { useState } from 'react';
import axios from 'axios';

const CadastroObra = () => {
  const [obra, setObra] = useState({
    nome: '',
    localizacao: '',
    cliente: '',
    data_inicio: '',
    data_fim: ''
  });

  const handleChange = (e) => {
    setObra({ ...obra, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/obras', obra);
      alert('Obra cadastrada com sucesso!');
      setObra({ nome: '', localizacao: '', cliente: '', data_inicio: '', data_fim: '' });
    } catch (error) {
      console.error('Erro ao cadastrar obra:', error);
      alert('Erro ao cadastrar obra!');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Obra</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nome" value={obra.nome} onChange={handleChange} placeholder="Nome da Obra" className="w-full p-2 border rounded" required />
        <input type="text" name="localizacao" value={obra.localizacao} onChange={handleChange} placeholder="Localização" className="w-full p-2 border rounded" required />
        <input type="text" name="cliente" value={obra.cliente} onChange={handleChange} placeholder="Cliente Responsável" className="w-full p-2 border rounded" required />
        <input type="date" name="data_inicio" value={obra.data_inicio} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="date" name="data_fim" value={obra.data_fim} onChange={handleChange} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroObra;

