import { useEffect, useState } from "react";
import { Hero } from "./pages/hero";
import { ProjetosGrid } from "./components/ProjetosGrid";
import { Footer } from "./components/Footer";
import { Sobre } from "./components/Sobre";
import { useProjetosPublicos } from "./hooks/useProjetosPublicos";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { getEixosTematicosPublicos } from "./api/projetosPublicos";
import type { OpcaoFiltro } from "./pages/hero";

const OPCAO_TODOS_EIXOS: OpcaoFiltro = {
  value: "",
  label: "Todos os eixos temáticos",
};

function App() {
  const [sobreAberto, setSobreAberto] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [curso, setCurso] = useState("");
  const [evento, setEvento] = useState("");
  const [eixo, setEixo] = useState("");
  const [opcoesEixo, setOpcoesEixo] = useState<OpcaoFiltro[]>([
    OPCAO_TODOS_EIXOS,
  ]);

  const debouncedSearch = useDebouncedValue(searchInput);

  const { projetos, meta, loading, error, filtros, setFiltros, setPage } =
    useProjetosPublicos();

  useEffect(() => {
    setFiltros({
      search: debouncedSearch,
      curso,
      evento,
      eixo,
    });
  }, [debouncedSearch, curso, evento, eixo, setFiltros]);

  useEffect(() => {
    let ativo = true;

    getEixosTematicosPublicos()
      .then((temas) => {
        if (!ativo) return;
        setOpcoesEixo([
          OPCAO_TODOS_EIXOS,
          ...temas.map((tema) => ({ value: tema.nome, label: tema.nome })),
        ]);
      })
      .catch(() => {
        // A listagem principal exibe o erro da API; o select permanece vazio.
      });

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <main>
      <Hero
        busca={searchInput}
        onBuscaChange={setSearchInput}
        curso={curso}
        onCursoChange={setCurso}
        evento={evento}
        onEventoChange={setEvento}
        eixo={eixo}
        onEixoChange={setEixo}
        opcoesEixo={opcoesEixo}
        sobreAberto={sobreAberto}
        onSobreClick={() => setSobreAberto(true)}
      />
      <ProjetosGrid
        projetos={projetos}
        meta={meta}
        loading={loading}
        error={error}
        page={filtros.page ?? 1}
        onPageChange={setPage}
      />
      <Footer onSobreClick={() => setSobreAberto(true)} />
      <Sobre aberto={sobreAberto} onClose={() => setSobreAberto(false)} />
    </main>
  );
}

export default App;
