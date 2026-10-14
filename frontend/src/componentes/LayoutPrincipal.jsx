import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CabecalhoSite from './CabecalhoSite'
import RodapeSite from './RodapeSite'

function LayoutPrincipal({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="pagina">
      <CabecalhoSite />
      <main className="pagina__conteudo">{children}</main>
      <RodapeSite />
    </div>
  )
}

export default LayoutPrincipal
