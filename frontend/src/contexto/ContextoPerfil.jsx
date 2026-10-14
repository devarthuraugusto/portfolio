import { createContext, useContext } from 'react'
import EstadoCarregando from '../componentes/EstadoCarregando'
import AvisoFalhaApi from '../componentes/AvisoFalhaApi'
import { useDadosDaApi } from '../hooks/useDadosDaApi'
import { buscarPerfil } from '../servicos/apiPortfolio'

const ContextoPerfil = createContext(null)

export function ProvedorPerfil({ children }) {
  const { dados, carregando, falhou, tentarNovamente } = useDadosDaApi(buscarPerfil)

  if (carregando) {
    return <EstadoCarregando tela />
  }

  if (falhou || !dados) {
    return <AvisoFalhaApi tela aoTentarNovamente={tentarNovamente} />
  }

  return <ContextoPerfil.Provider value={dados}>{children}</ContextoPerfil.Provider>
}

export function usePerfil() {
  return useContext(ContextoPerfil)
}
