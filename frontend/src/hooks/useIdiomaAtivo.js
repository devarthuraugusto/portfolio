import { useTranslation } from 'react-i18next'

export function useIdiomaAtivo() {
  const { i18n } = useTranslation()
  return i18n.language === 'en' ? 'en' : 'pt'
}
