import { useTranslation } from 'react-i18next'
import { useIdiomaAtivo } from '../hooks/useIdiomaAtivo'
import { formatarPeriodo } from '../utilitarios/datas'

function CartaoExperiencia({ experiencia }) {
  const { t } = useTranslation()
  const idioma = useIdiomaAtivo()

  return (
    <article className="cartao-experiencia">
      <img
        className="cartao-experiencia__logo"
        src={experiencia.urlLogo}
        alt={t('experiencias.textoAlternativoLogo', { instituicao: experiencia.instituicao })}
        loading="lazy"
      />
      <div className="cartao-experiencia__texto">
        <span className="etiqueta">{t(`experiencias.filtros.${experiencia.categoria}`)}</span>
        <h2>{experiencia.cargo[idioma]}</h2>
        <p className="periodo">
          {formatarPeriodo(experiencia.dataInicio, experiencia.dataFim, t('experiencias.atual'))}
        </p>
        <p className="cartao-experiencia__instituicao">{experiencia.instituicao}</p>
        <p>{experiencia.descricao[idioma]}</p>
      </div>
    </article>
  )
}

export default CartaoExperiencia
