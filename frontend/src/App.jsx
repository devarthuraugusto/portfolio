import { Navigate, Route, Routes } from 'react-router-dom'
import { ProvedorPerfil } from './contexto/ContextoPerfil'
import LayoutPrincipal from './componentes/LayoutPrincipal'
import PaginaSobre from './paginas/PaginaSobre'
import PaginaProjetos from './paginas/PaginaProjetos'
import PaginaExperiencias from './paginas/PaginaExperiencias'
import PaginaContato from './paginas/PaginaContato'

function App() {
  return (
    <ProvedorPerfil>
      <LayoutPrincipal>
        <Routes>
          <Route path="/" element={<PaginaSobre />} />
          <Route path="/projetos" element={<PaginaProjetos />} />
          <Route path="/experiencias" element={<PaginaExperiencias />} />
          <Route path="/contato" element={<PaginaContato />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutPrincipal>
    </ProvedorPerfil>
  )
}

export default App
