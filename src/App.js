import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroObras from './pages/CadastroObra';
import CadastroEtapa from './pages/CadastroEtapa';
import CadastroColaborador from './pages/CadastroColaborador';
import ListagemColaboradores from './pages/ListagemColaboradores';
import CadastroPagamento from './pages/CadastroPagamento';
import ListagemPagamentos from './pages/ListagemPagamentos';
import ListagemObras from './pages/ListagemObras';
import EditarObra from './pages/EditarObra';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen p-4">
        <nav className="mb-6 flex gap-4">
          <Link to="/cadastro-obra" className="text-blue-600 hover:underline">Cadastro de Obra</Link>
          <Link to="/cadastro-etapa" className="text-blue-600 hover:underline">Cadastro de Etapa</Link>
          <Link to="/cadastro-colaborador" className="text-blue-600 hover:underline">Cadastro de Colaborador</Link>
          <Link to="/colaboradores" className="text-blue-600 hover:underline">Listar Colaboradores</Link>
          <Link to="/cadastro-pagamento" className="text-blue-600 hover:underline">Cadastro de Pagamento</Link>
          <Link to="/pagamentos" className="text-blue-600 hover:underline">Listar Pagamentos</Link>
          <Link to="/obras" className="text-blue-600 hover:underline">Listar Obras</Link>
          <Link to={`/editar-obra/obra.id}`} className="text-blue-600 hover:underline">Editar</Link>
                   
        </nav>
        <Routes>
          <Route path="/cadastro-obra" element={<CadastroObra />} />
          <Route path="/cadastro-etapa" element={<CadastroEtapa />} />
          <Route path="/cadastro-colaborador" element={<CadastroColaborador />} />
          <Route path="/colaboradores" element={<ListagemColaboradores />} />
          <Route path="/cadastro-pagamento" element={<CadastroPagamento />} />
          <Route path="/pagamentos" element={<ListagemPagamentos />} />
          <Route path="/obras" element={<ListagemObras />} />
          <Route path="/editar-obra/:id" element={<EditarObra />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
