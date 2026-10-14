import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePerfil } from '../contexto/ContextoPerfil'
import { useIdiomaAtivo } from '../hooks/useIdiomaAtivo'

function PaginaSobre() {
  const { t } = useTranslation()
  const perfil = usePerfil()
  const idioma = useIdiomaAtivo()

  return (
    <>
      <section className="heroi">
        <div className="heroi__conteudo">
          <div className="heroi__texto">
            <p className="sobretitulo">{perfil.area[idioma]}</p>
            <h1 className="heroi__marca">
              {perfil.marcaInicio}
              <span>{perfil.marcaDestaque}</span>
            </h1>
            <p className="heroi__cargo">{perfil.cargo[idioma]}</p>
            <div className="heroi__acoes">
              <Link to="/projetos" className="botao botao--amarelo">
                {t('sobre.verProjetos')}
              </Link>
              <Link to="/contato" className="botao botao--contorno">
                {t('sobre.falarComigo')}
              </Link>
            </div>
          </div>
          <figure className="heroi__foto">
            <img src={perfil.urlFoto} alt={t('sobre.textoAlternativoFoto')} />
          </figure>
        </div>
        <div className="faixa-zebra" aria-hidden="true" />
      </section>

      <section className="secao">
        <div className="secao__conteudo">
          <p className="rotulo-secao">{t('sobre.secaoApresentacao')}</p>
          <h2 className="titulo-secao">{t('sobre.titulo')}</h2>
          <p className="secao__legenda">{t('sobre.legenda')}</p>

          <div className="grade-apresentacao">
            <article className="cartao">
              <header className="cartao__topo">
                <span>{t('sobre.cartaoPortugues')}</span>
                <span>{t('sobre.siglaPortugues')}</span>
              </header>
              <div className="cartao__corpo">
                {perfil.apresentacao.pt.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </article>
            <article className="cartao">
              <header className="cartao__topo">
                <span>{t('sobre.cartaoIngles')}</span>
                <span>{t('sobre.siglaIngles')}</span>
              </header>
              <div className="cartao__corpo" lang="en">
                {perfil.apresentacao.en.map((paragrafo) => (
                  <p key={paragrafo}>{paragrafo}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="secao secao--alternada">
        <div className="secao__conteudo grade-destaques">
          {perfil.destaques.map((destaque) => (
            <article key={destaque.chave} className="cartao">
              <header className="cartao__topo">
                <span>{t(`sobre.destaques.${destaque.chave}`)}</span>
              </header>
              <div className="cartao__corpo cartao__corpo--compacto">
                <p className="destaque__principal">{destaque.principal[idioma]}</p>
                <p className="destaque__complemento">{destaque.complemento[idioma]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="secao">
        <div className="secao__conteudo">
          <p className="rotulo-secao">{t('sobre.secaoStack')}</p>
          <h2 className="titulo-secao">{t('sobre.habilidades')}</h2>
          <ul className="etiquetas etiquetas--grandes">
            {perfil.habilidades.map((habilidade) => (
              <li key={habilidade} className="etiqueta">
                {habilidade}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="chamada">
        <div className="chamada__conteudo">
          <h2>{t('sobre.chamada')}</h2>
          <Link to="/projetos" className="botao botao--amarelo">
            {t('sobre.irParaProjetos')} →
          </Link>
        </div>
      </section>
    </>
  )
}

export default PaginaSobre
