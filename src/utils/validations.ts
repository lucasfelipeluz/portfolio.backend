import { Habilidades, Projetos } from '@src/types/Models';
import ValidationResponses from '@src/types/ValidationResponses';
import { Request } from 'express';
import strings from './strings';

export const validationsProjeto = (req: Request): ValidationResponses => {
  const { titulo, descricao, url_github: urlGitHub }: Projetos = req.body;

  if (!titulo || !descricao || !urlGitHub) {
    return { status: false, msgError: strings.erroPostBody };
  }

  return { status: true };
};

export const validationsHabilidades = (req: Request): ValidationResponses => {
  const { titulo, descricao, prioridade, experiencia, cores, icones }: Habilidades = req.body;

  if (!titulo || !descricao || !prioridade || !experiencia || !cores || !icones) {
    return { status: false, msgError: strings.erroPostBody };
  }

  return { status: true };
};
