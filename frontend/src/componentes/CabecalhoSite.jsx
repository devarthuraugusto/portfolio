import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useMantineColorScheme } from '@mantine/core'
import { IconMenu2, IconMoon, IconSun, IconX } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { usePerfil } from '../contexto/ContextoPerfil'
import { useIdiomaAtivo } from '../hooks/useIdiomaAtivo'

const LINKS_NAVEGACAO = [
  { destino: '/', chave: 'navegacao.sobre', exato: true },
  { destino: '/projetos', chave: 'navegacao.projetos' },
  { destino: '/experiencias', chave: 'navegacao.experiencias' },
  { destino: '/contato', chave: 'navegacao.contato' },
]

function CabecalhoSite() {
  const { t, i18n } = useTranslation()
  const perfil = usePerfil()
  const idiomaAtual = useIdiomaAtivo()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const [menuAberto, setMenuAberto] = useState(false)

  const temaEscuro = colorScheme === 'dark'

  const alternarIdioma = () => {
    i18n.changeLanguage(idiomaAtual === 'pt' ? 'en' : 'pt')
  }

  return (
    <header className="cabecalho">
      <div className="cabecalho__conteudo">
        <Link to="/" className="marca" onClick={() => setMenuAberto(false)}>
          {perfil.marcaInicio}
          <span>{perfil.marcaDestaque}</span>
        </Link>

        <nav
          className={menuAberto ? 'navegacao navegacao--aberta' : 'navegacao'}
          aria-label={t('navegacao.principal')}
        >
          {LINKS_NAVEGACAO.map((link) => (
            <NavLink
              key={link.destino}
              to={link.destino}
              end={link.exato}
              className={({ isActive }) =>
                isActive ? 'navegacao__link navegacao__link--ativo' : 'navegacao__link'
              }
              onClick={() => setMenuAberto(false)}
            >
              {t(link.chave)}
            </NavLink>
          ))}
        </nav>

        <div className="cabecalho__controles">
          <button
            type="button"
            className="botao-quadrado"
            onClick={toggleColorScheme}
            aria-label={t('navegacao.alternarTema')}
          >
            {temaEscuro ? <IconSun size={20} /> : <IconMoon size={20} />}
          </button>
          <button
            type="button"
            className="botao-quadrado"
            onClick={alternarIdioma}
            aria-label={t('navegacao.alternarIdioma')}
          >
            {idiomaAtual.toUpperCase()}
          </button>
          <button
            type="button"
            className="botao-quadrado botao-menu"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            aria-expanded={menuAberto}
            aria-label={t('navegacao.menu')}
          >
            {menuAberto ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </button>
        </div>
      </div>
      <div className="faixa-zebra" aria-hidden="true" />
    </header>
  )
}

export default CabecalhoSite
