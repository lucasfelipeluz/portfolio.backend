import ProjetosModel from '@src/models/ProjetosModel';
import { Request } from 'express';

export const filtersGlobal = (req: Request, includes?: any) => {
  const { id } = req.params;

  const filters: any = {
    where: {},
    order: [['criado_em', 'DESC']],
    include: { model: ProjetosModel },
  };

  if (id) {
    filters.where.id = id;
  }
  if (includes) {
    filters.include.push(includes);
  }

  return filters;
};

export const filtersGlobalWithPrioridade = (req: Request, includes?: any) => {
  const { id } = req.params;

  const filters: any = {
    where: {},
    order: [['prioridade', 'DESC']],
    include: [],
  };

  if (id) {
    filters.where.id = id;
  }
  if (includes) {
    filters.include.push(includes);
  }

  return filters;
};
