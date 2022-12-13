export interface SobreMim {
  id?: number;
  nome: string;
  texto: string;
  titulo_emprego: string;
}

export interface Projetos {
  id?: number;
  titulo: string;
  descricao: string;
  prioridade: number;
  url_website: string;
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

export interface Links {
  id?: number;
  nome: string;
  url: string;
}
