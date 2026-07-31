import { Hero } from "./pages/hero";
import { ProjetosGrid } from "./components/ProjetosGrid";
import { Footer} from "./components/Footer";
function App() {
  return (
    <main>
      <Hero />
      <ProjetosGrid />
      <Footer />
    </main>
  );
}

export default App;