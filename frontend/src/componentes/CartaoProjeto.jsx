import { IconBrandGithub } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useIdiomaAtivo } from '../hooks/useIdiomaAtivo'
import { formatarMesAno } from '../utilitarios/datas'

function CartaoProjeto({ projeto, posicao, maisRecente }) {
  const { t } = useTranslation()
  const idioma = useIdiomaAtivo()
  const nome = projeto.nome[idioma]
  const numero = String(posicao).padStart(2, '0')
  const titulo = maisRecente
    ? `${t('projetos.rotuloProjeto')} ${numero} · ${t('projetos.seloMaisRecente')}`
    : `${t('projetos.rotuloProjeto')} ${numero}`

  return (
    <li className="linha-do-tempo__item">
      <span className="linha-do-tempo__marco" aria-hidden="true" />
      <article className="cartao">
        <header className="cartao__topo">
          <span>{titulo}</span>
          <time dateTime={projeto.dataInicio}>{formatarMesAno(projeto.dataInicio)}</time>
        </header>
        <div className="cartao-projeto">
          <img
            className="cartao-projeto__imagem"
            src={projeto.urlImagem}
            alt={t('projetos.textoAlternativoImagem', { nome })}
            loading="lazy"
          />
          <div className="cartao-projeto__texto">
            <h2>{nome}</h2>
            <p>{projeto.descricao[idioma]}</p>
            <p className="rotulo-pequeno">{t('projetos.tecnologias')}</p>
            <ul className="etiquetas">
              {projeto.tecnologias.map((tecnologia) => (
                <li key={tecnologia} className="etiqueta">
                  {tecnologia}
                </li>
              ))}
            </ul>
            <a
              className="botao botao--amarelo cartao-projeto__link"
              href={projeto.urlRepositorio}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={20} aria-hidden="true" />
              {t('projetos.verNoGithub')}
            </a>
          </div>
        </div>
      </article>
    </li>
  )
}

export default CartaoProjeto
