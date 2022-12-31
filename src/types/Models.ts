import HabilidadesModel from '@src/models/HabilidadesModel';
import ProjetosModel from '@src/models/ProjetosModel';
import SobreMimModel from '@src/models/SobreMimModel';

export interface SobreMim {
  id?: number;
  nome: string;
  texto: string;
  titulo_emprego: string;
  link_telegram: string;
  link_instagram: string;
  link_linkedin: string;
  link_github: string;
  disponivel: boolean;
}

export interface Projetos {
  id?: number;
  titulo: string;
  descricao: string;
  prioridade?: number;
  url_website?: string;
  url_github: string;
}

export interface Habilidades {
  id?: number;
  titulo: string;
  descricao: string;
  experiencia: number;
  prioridade: number;
  cores: string;
  icones: string;
}

export interface ProjetosHabilidades {
  id?: number;
  id_habilidades: number;
  id_projetos: number;
}

export interface HomeResponse {
  projetos: ProjetosModel[];
  habilidades: HabilidadesModel[];
  sobreMim: SobreMimModel;
}
