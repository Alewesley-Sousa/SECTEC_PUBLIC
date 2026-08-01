import { useEffect, useState } from "react";
import { Hero } from "./pages/hero";
import { ProjetosGrid } from "./components/ProjetosGrid";
import { Footer } from "./components/Footer";
import { useProjetosPublicos } from "./hooks/useProjetosPublicos";
import { useDebouncedValue } from "./hooks/useDebouncedValue";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput);

  const { projetos, meta, loading, error, filtros, setFiltros, setPage } =
    useProjetosPublicos();

  useEffect(() => {
    setFiltros({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <main>
      <Hero busca={searchInput} onBuscaChange={setSearchInput} />
      <ProjetosGrid
      projetos={projetos}
      meta={meta}
      loading={loading}
      error={error}
      page={filtros.page ?? 1}
      onPageChange={setPage}
      />
      <Footer />
    </main>
  );
}

export default App;