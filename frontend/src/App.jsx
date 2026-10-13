import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ExperiencesPage from './pages/ExperiencesPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/experiencias" element={<ExperiencesPage />} />
        <Route path="/contato" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  )
}

export default App
