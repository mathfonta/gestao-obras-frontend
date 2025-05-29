import React, { useState } from 'react';
import axios from 'axios';

const CadastroColaborador = () => {
  const [form, setForm] = useState({
    nome: '',
    funcao: '',
    endereco: '',
    telefone: '',
    chave_pix: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/colaboradores', form);
      alert('Colaborador cadastrado com sucesso!');
      setForm({
        nome: '',
        funcao: '',
        endereco: '',
        telefone: '',
        chave_pix: '',
        observacoes: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar colaborador:', error);
      alert('Erro ao cadastrar colaborador.');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Cadastro de Colaborador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nome" value={form.nome} onChange={handleChange} required placeholder="Nome" className="w-full border p-2 rounded" />
        <input name="funcao" value={form.funcao} onChange={handleChange} required placeholder="Função" className="w-full border p-2 rounded" />
        <input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço (opcional)" className="w-full border p-2 rounded" />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" className="w-full border p-2 rounded" />
        <input name="chave_pix" value={form.chave_pix} onChange={handleChange} placeholder="Chave PIX" className="w-full border p-2 rounded" />
        <textarea name="observacoes" value={form.observacoes} onChange={handleChange} placeholder="Observações" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroColaborador;
