import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconMail,
} from '@tabler/icons-react'

const ICONES_POR_TIPO = {
  email: IconMail,
  whatsapp: IconBrandWhatsapp,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
}

function IconeCanal({ tipo, tamanho = 28 }) {
  const Icone = ICONES_POR_TIPO[tipo] ?? IconMail
  return <Icone size={tamanho} stroke={1.8} aria-hidden="true" />
}

export default IconeCanal
