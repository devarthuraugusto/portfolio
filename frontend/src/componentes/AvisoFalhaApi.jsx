import { useTranslation } from 'react-i18next'

function AvisoFalhaApi({ tela = false, aoTentarNovamente }) {
  const { t } = useTranslation()

  return (
    <div className={tela ? 'estado estado--tela' : 'estado'} role="alert">
      <p className="estado__texto">{t('comum.falhaApi')}</p>
      <button type="button" className="botao botao--amarelo" onClick={aoTentarNovamente}>
        {t('comum.tentarNovamente')}
      </button>
    </div>
  )
}

export default AvisoFalhaApi
