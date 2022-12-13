import { Request } from 'express';

export const filtersGlobal = (req: Request) => {
  const { id } = req.params;

  const filters: any = {
    where: {},
    order: [['criado_em', 'DESC']],
  };

  if (id) {
    filters.where.id = id;
  }

  return filters;
};

export const filtersGlobalWithPrioridade = (req: Request) => {
  const { id } = req.params;

  const filters: any = {
    where: {},
    order: [['prioridade', 'DESC']],
  };

  if (id) {
    filters.where.id = id;
  }

  return filters;
};
