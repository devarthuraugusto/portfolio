import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import pt from './locales/pt.json'

const CHAVE_IDIOMA_SALVO = 'idioma-portfolio'
const IDIOMAS_SUPORTADOS = ['pt', 'en']
const LANG_HTML_POR_IDIOMA = { pt: 'pt-BR', en: 'en' }

function lerIdiomaSalvo() {
  try {
    const salvo = localStorage.getItem(CHAVE_IDIOMA_SALVO)
    return IDIOMAS_SUPORTADOS.includes(salvo) ? salvo : null
  } catch {
    return null
  }
}

function salvarIdioma(idioma) {
  try {
    localStorage.setItem(CHAVE_IDIOMA_SALVO, idioma)
  } catch {
    return
  }
}

function sincronizarDocumento(idioma) {
  document.documentElement.lang = LANG_HTML_POR_IDIOMA[idioma] ?? LANG_HTML_POR_IDIOMA.pt
  document.title = i18n.t('comum.tituloDocumento')
}

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: lerIdiomaSalvo() ?? 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
})

sincronizarDocumento(i18n.language)

i18n.on('languageChanged', (idioma) => {
  salvarIdioma(idioma)
  sincronizarDocumento(idioma)
})

export default i18n
