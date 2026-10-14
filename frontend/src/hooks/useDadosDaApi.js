import { useEffect, useState } from 'react'

export function useDadosDaApi(buscar) {
  const [dados, setDados] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [falhou, setFalhou] = useState(false)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setFalhou(false)

    buscar()
      .then((resultado) => {
        if (ativo) setDados(resultado)
      })
      .catch(() => {
        if (ativo) setFalhou(true)
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [buscar, tentativa])

  return {
    dados,
    carregando,
    falhou,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
  }
}
