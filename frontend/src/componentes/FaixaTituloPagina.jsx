function FaixaTituloPagina({ sobretitulo, titulo, descricao, children }) {
  return (
    <section className="faixa-titulo">
      <div className="faixa-titulo__conteudo">
        <div>
          <p className="sobretitulo">{sobretitulo}</p>
          <h1 className="faixa-titulo__titulo">{titulo}</h1>
          <p className="faixa-titulo__descricao">{descricao}</p>
        </div>
        {children}
      </div>
      <div className="faixa-zebra" aria-hidden="true" />
    </section>
  )
}

export default FaixaTituloPagina
