import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDadosDaApi } from '../hooks/useDadosDaApi'
import { buscarExperiencias } from '../servicos/apiPortfolio'
import FaixaTituloPagina from '../componentes/FaixaTituloPagina'
import CartaoExperiencia from '../componentes/CartaoExperiencia'
import EstadoCarregando from '../componentes/EstadoCarregando'
import AvisoFalhaApi from '../componentes/AvisoFalhaApi'

const CATEGORIAS = ['TODAS', 'PROFISSIONAL', 'ESTAGIO', 'FREELA', 'OPEN_SOURCE', 'EVENTO']

function PaginaExperiencias() {
  const { t } = useTranslation()
  const { dados, carregando, falhou, tentarNovamente } = useDadosDaApi(buscarExperiencias)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('TODAS')

  const experienciasFiltradas = (dados ?? []).filter(
    (experiencia) =>
      categoriaSelecionada === 'TODAS' || experiencia.categoria === categoriaSelecionada,
  )

  return (
    <>
      <FaixaTituloPagina
        sobretitulo={t('experiencias.sobretitulo')}
        titulo={t('experiencias.titulo')}
        descricao={t('experiencias.descricao')}
      />

      <section className="secao">
        <div className="secao__conteudo">
          <div className="filtros" role="group" aria-label={t('experiencias.filtrarPorTipo')}>
            {CATEGORIAS.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={
                  categoria === categoriaSelecionada ? 'filtro filtro--ativo' : 'filtro'
                }
                onClick={() => setCategoriaSelecionada(categoria)}
                aria-pressed={categoria === categoriaSelecionada}
              >
                {t(`experiencias.filtros.${categoria}`)}
              </button>
            ))}
          </div>

          {carregando ? <EstadoCarregando /> : null}
          {falhou ? <AvisoFalhaApi aoTentarNovamente={tentarNovamente} /> : null}
          {!carregando && !falhou && experienciasFiltradas.length === 0 ? (
            <p className="estado__texto">{t('experiencias.nenhumaEncontrada')}</p>
          ) : null}
          {!carregando && !falhou ? (
            <div className="grade-experiencias">
              {experienciasFiltradas.map((experiencia) => (
                <CartaoExperiencia key={experiencia.id} experiencia={experiencia} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

export default PaginaExperiencias
