import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroObra from './pages/CadastroObra';
import CadastroEtapa from './pages/CadastroEtapa';
import CadastroColaborador from './pages/CadastroColaborador'; // ✅ Importação nova
import CadastroPagamento from './pages/CadastroPagamento';
import ListaColaboradores from './pages/ListaColaboradores';
import ListagemColaboradores from './pages/ListagemColaboradores';
import ListaObras from './pages/ListaObras';


function App() { 
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <nav className="mb-6 flex gap-4"></nav>
        {/* Menu de navegação */}
        <nav className="mb-6 flex gap-4">
          <Link to="/cadastro-obra" className="text-blue-600 hover:underline">Cadastro de Obra</Link>
          <Link to="/cadastro-etapa" className="text-blue-600 hover:underline">Cadastro de Etapa</Link>
          <Link to="/cadastro-colaborador" className="text-blue-600 hover:underline">Cadastro de Colaborador</Link> {/* ✅ Novo link */}
          <Link to="/cadastro-pagamento" className="text-blue-600 hover:underline">Cadastro de Pagamento</Link>         
          <Link to="/colaboradores" className="text-blue-600 hover:underline">Listar Colaboradores</Link>
          <Link to="/colaboradores" className="text-blue-600 hover:underline">Lista de Colaboradores</Link>
          <Link to="/lista-obras" className="text-blue-600 hover:underline">Listar Obras</Link>
 
          
        </nav>

        {/* Rotas */}
        <Routes>
          <Route path="/cadastro-obra" element={<CadastroObra />} />
          <Route path="/cadastro-etapa" element={<CadastroEtapa />} />
          <Route path="/cadastro-colaborador" element={<CadastroColaborador />} /> {/* ✅ Nova rota */}
          <Route path="/cadastro-pagamento" element={<CadastroPagamento />} />
          <Route path="/colaboradores" element={<ListaColaboradores />} />
          <Route path="/colaboradores" element={<ListagemColaboradores />} />
          <Route path="/lista-obras" element={<ListaObras />} />

        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
