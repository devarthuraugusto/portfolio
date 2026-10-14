const URL_BASE_API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${URL_BASE_API}${caminho}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...(opcoes.headers ?? {}),
    },
  })

  if (!resposta.ok) {
    throw new Error(`Falha na requisição: ${resposta.status}`)
  }

  if (resposta.status === 202 || resposta.status === 204) {
    return null
  }

  return resposta.json()
}

export function buscarPerfil() {
  return requisitar('/perfil')
}

export function buscarProjetos() {
  return requisitar('/projetos')
}

export function buscarExperiencias() {
  return requisitar('/experiencias')
}

export function enviarMensagemContato(mensagem) {
  return requisitar('/contato', {
    method: 'POST',
    body: JSON.stringify(mensagem),
  })
}
