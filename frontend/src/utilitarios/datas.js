export function formatarMesAno(dataIso) {
  const [ano, mes] = dataIso.split('-')
  return `${mes}/${ano}`
}

export function formatarPeriodo(dataInicio, dataFim, rotuloAtual) {
  const fim = dataFim ? formatarMesAno(dataFim) : rotuloAtual
  return `${formatarMesAno(dataInicio)} - ${fim}`
}
