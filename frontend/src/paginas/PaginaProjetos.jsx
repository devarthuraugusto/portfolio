import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDadosDaApi } from '../hooks/useDadosDaApi'
import { buscarProjetos } from '../servicos/apiPortfolio'
import FaixaTituloPagina from '../componentes/FaixaTituloPagina'
import CartaoProjeto from '../componentes/CartaoProjeto'
import EstadoCarregando from '../componentes/EstadoCarregando'
import AvisoFalhaApi from '../componentes/AvisoFalhaApi'

function PaginaProjetos() {
  const { t } = useTranslation()
  const { dados, carregando, falhou, tentarNovamente } = useDadosDaApi(buscarProjetos)
  const [maisRecentePrimeiro, setMaisRecentePrimeiro] = useState(false)

  const projetosEmOrdem = useMemo(() => {
    if (!dados) return []
    const crescentes = [...dados].sort((a, b) => a.dataInicio.localeCompare(b.dataInicio))
    return crescentes.map((projeto, indice) => ({
      projeto,
      posicao: indice + 1,
      maisRecente: indice === crescentes.length - 1,
    }))
  }, [dados])

  const projetosExibidos = maisRecentePrimeiro ? [...projetosEmOrdem].reverse() : projetosEmOrdem

  return (
    <>
      <FaixaTituloPagina
        sobretitulo={t('projetos.sobretitulo')}
        titulo={t('projetos.titulo')}
        descricao={t('projetos.descricao')}
      >
        <div className="ordenacao" role="group" aria-label={t('projetos.ordenacao')}>
          <button
            type="button"
            className={!maisRecentePrimeiro ? 'ordenacao__opcao ordenacao__opcao--ativa' : 'ordenacao__opcao'}
            onClick={() => setMaisRecentePrimeiro(false)}
            aria-pressed={!maisRecentePrimeiro}
          >
            {t('projetos.maisAntigo')} ↓
          </button>
          <button
            type="button"
            className={maisRecentePrimeiro ? 'ordenacao__opcao ordenacao__opcao--ativa' : 'ordenacao__opcao'}
            onClick={() => setMaisRecentePrimeiro(true)}
            aria-pressed={maisRecentePrimeiro}
          >
            {t('projetos.maisRecente')}
          </button>
        </div>
      </FaixaTituloPagina>

      <section className="secao">
        <div className="secao__conteudo">
          {carregando ? <EstadoCarregando /> : null}
          {falhou ? <AvisoFalhaApi aoTentarNovamente={tentarNovamente} /> : null}
          {!carregando && !falhou ? (
            <ol className="linha-do-tempo">
              {projetosExibidos.map(({ projeto, posicao, maisRecente }) => (
                <CartaoProjeto
                  key={projeto.id}
                  projeto={projeto}
                  posicao={posicao}
                  maisRecente={maisRecente}
                />
              ))}
            </ol>
          ) : null}
        </div>
      </section>
    </>
  )
}

export default PaginaProjetos
