import { useTranslation } from 'react-i18next'

function EstadoCarregando({ tela = false }) {
  const { t } = useTranslation()

  return (
    <div className={tela ? 'estado estado--tela' : 'estado'} role="status">
      <span className="estado__barra" aria-hidden="true" />
      <p className="estado__texto">{t('comum.carregando')}</p>
    </div>
  )
}

export default EstadoCarregando
