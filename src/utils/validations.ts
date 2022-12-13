/* eslint-disable import/prefer-default-export */
import { Projetos } from '@src/types/Models';
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
