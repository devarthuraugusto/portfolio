import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePerfil } from '../contexto/ContextoPerfil'
import IconeCanal from './IconeCanal'

const LINKS_RODAPE = [
  { destino: '/', chave: 'rodape.sobre' },
  { destino: '/projetos', chave: 'rodape.projetos' },
  { destino: '/experiencias', chave: 'rodape.experiencias' },
  { destino: '/contato', chave: 'rodape.contato' },
]

const TIPOS_REDES_SOCIAIS = ['github', 'linkedin']

function RodapeSite() {
  const { t } = useTranslation()
  const perfil = usePerfil()
  const anoAtual = new Date().getFullYear()
  const redesSociais = perfil.canais.filter((canal) => TIPOS_REDES_SOCIAIS.includes(canal.tipo))

  return (
    <footer className="rodape">
      <div className="faixa-zebra faixa-zebra--invertida" aria-hidden="true" />
      <div className="rodape__conteudo">
        <div className="rodape__identidade">
          <span className="marca">
            {perfil.marcaInicio}
            <span>{perfil.marcaDestaque}</span>
          </span>
          <p>{t('rodape.direitos', { ano: anoAtual, marca: perfil.marcaInicio + perfil.marcaDestaque })}</p>
        </div>

        <nav className="rodape__links" aria-label={t('rodape.navegacao')}>
          {LINKS_RODAPE.map((link) => (
            <Link key={link.destino} to={link.destino}>
              {t(link.chave)}
            </Link>
          ))}
        </nav>

        <div className="rodape__redes">
          {redesSociais.map((canal) => (
            <a
              key={canal.tipo}
              href={canal.link}
              className="botao-quadrado"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={canal.rotulo}
            >
              <IconeCanal tipo={canal.tipo} tamanho={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default RodapeSite
