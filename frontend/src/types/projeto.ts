export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  equipe: string[];
  eixoTematico: string;
  evento: string;
  curso: string;
  bannerUrl: string;
  videoUrl: string | null;
}