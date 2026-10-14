import { useState } from 'react'
import { useForm } from '@mantine/form'
import { useTranslation } from 'react-i18next'
import { usePerfil } from '../contexto/ContextoPerfil'
import { enviarMensagemContato } from '../servicos/apiPortfolio'
import FaixaTituloPagina from '../componentes/FaixaTituloPagina'
import IconeCanal from '../componentes/IconeCanal'

const FORMATO_EMAIL = /^\S+@\S+\.\S+$/

function PaginaContato() {
  const { t } = useTranslation()
  const perfil = usePerfil()
  const [enviando, setEnviando] = useState(false)
  const [resultadoEnvio, setResultadoEnvio] = useState(null)

  const formulario = useForm({
    initialValues: { nome: '', email: '', mensagem: '' },
    validate: {
      nome: (valor) => (valor.trim() ? null : t('contato.validacao.nomeObrigatorio')),
      email: (valor) =>
        FORMATO_EMAIL.test(valor.trim()) ? null : t('contato.validacao.emailInvalido'),
      mensagem: (valor) =>
        valor.trim().length >= 10 ? null : t('contato.validacao.mensagemCurta'),
    },
  })

  const enviarFormulario = formulario.onSubmit(async (valores) => {
    setEnviando(true)
    setResultadoEnvio(null)
    try {
      await enviarMensagemContato({
        nome: valores.nome.trim(),
        email: valores.email.trim(),
        mensagem: valores.mensagem.trim(),
      })
      setResultadoEnvio('sucesso')
      formulario.reset()
    } catch {
      setResultadoEnvio('falha')
    } finally {
      setEnviando(false)
    }
  })

  return (
    <>
      <FaixaTituloPagina
        sobretitulo={t('contato.sobretitulo')}
        titulo={t('contato.titulo')}
        descricao={t('contato.descricao')}
      />

      <section className="secao">
        <div className="secao__conteudo grade-contato">
          <div>
            <h2 className="titulo-secao">{t('contato.canaisDiretos')}</h2>
            <ul className="grade-canais">
              {perfil.canais.map((canal) => (
                <li key={canal.tipo}>
                  <a
                    className="cartao-canal"
                    href={canal.link}
                    target={canal.tipo === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                  >
                    <IconeCanal tipo={canal.tipo} />
                    <strong>{canal.rotulo}</strong>
                    <span>{canal.valor}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form className="cartao formulario" onSubmit={enviarFormulario} noValidate>
            <header className="cartao__topo">
              <span>{t('contato.formulario.titulo')}</span>
              <span>{t('contato.formulario.selo')}</span>
            </header>
            <div className="cartao__corpo formulario__campos">
              <label className="campo">
                <span>{t('contato.formulario.nome')}</span>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder={t('contato.formulario.placeholderNome')}
                  aria-invalid={Boolean(formulario.errors.nome)}
                  {...formulario.getInputProps('nome')}
                />
                {formulario.errors.nome ? (
                  <em className="campo__erro">{formulario.errors.nome}</em>
                ) : null}
              </label>

              <label className="campo">
                <span>{t('contato.formulario.email')}</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder={t('contato.formulario.placeholderEmail')}
                  aria-invalid={Boolean(formulario.errors.email)}
                  {...formulario.getInputProps('email')}
                />
                {formulario.errors.email ? (
                  <em className="campo__erro">{formulario.errors.email}</em>
                ) : null}
              </label>

              <label className="campo">
                <span>{t('contato.formulario.mensagem')}</span>
                <textarea
                  rows={6}
                  placeholder={t('contato.formulario.placeholderMensagem')}
                  aria-invalid={Boolean(formulario.errors.mensagem)}
                  {...formulario.getInputProps('mensagem')}
                />
                {formulario.errors.mensagem ? (
                  <em className="campo__erro">{formulario.errors.mensagem}</em>
                ) : null}
              </label>

              <button type="submit" className="botao botao--amarelo" disabled={enviando}>
                {enviando ? t('contato.formulario.enviando') : `${t('contato.formulario.enviar')} →`}
              </button>

              {resultadoEnvio === 'sucesso' ? (
                <p className="formulario__retorno formulario__retorno--sucesso" role="status">
                  {t('contato.retorno.sucesso')}
                </p>
              ) : null}
              {resultadoEnvio === 'falha' ? (
                <p className="formulario__retorno formulario__retorno--falha" role="alert">
                  {t('contato.retorno.falha')}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default PaginaContato
