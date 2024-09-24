import { AboutMeDto, AcessMetricsDto, ProjectDto, SkillDto } from '@/application/dtos';
import { ServiceFilter } from '@/core/types';
import { ParsedQs } from 'qs';
import { Op } from 'sequelize';

function projectFilter(query: ParsedQs): ServiceFilter<ProjectDto> {
  const { id, isActive, order } = query;

  const filter: ServiceFilter<ProjectDto> = {};

  if (id) {
    filter.where = { id: parseInt(id as string, 10) };
  }
  if (isActive === 'true' || isActive === 'false') {
    filter.isActive = isActive === 'true';
  }
  if (order) {
    const stringOrder = order as string;

    const [by, through] = stringOrder.replace(' ', '').split(',');

    filter.order = [{ by: by as 'ASC' | 'DESC', through: through as keyof ProjectDto }];
  } else {
    filter.order = [{ by: 'DESC', through: 'viewPriority' as keyof ProjectDto }];
  }

  return filter;
}

function skillFilter(query: ParsedQs): ServiceFilter<SkillDto> {
  const { id, isActive, order } = query;

  const filter: ServiceFilter<SkillDto> = {};

  if (id) {
    filter.where = { id: parseInt(id as string, 10) };
  }
  if (isActive === 'true' || isActive === 'false') {
    filter.isActive = isActive === 'true';
  }
  if (order) {
    const stringOrder = order as string;

    const [by, through] = stringOrder.replace(' ', '').split(',');

    filter.order = [{ by: by as 'ASC' | 'DESC', through: through as keyof SkillDto }];
  } else {
    filter.order = [{ by: 'DESC', through: 'viewPriority' as keyof SkillDto }];
  }

  return filter;
}

function aboutMeFilter(query: ParsedQs): ServiceFilter<AboutMeDto> {
  const { id, is_active: isActive, order, id_user: idUser } = query;

  const filter: ServiceFilter<AboutMeDto> = {};

  if (id) {
    filter.where = { id: parseInt(id as string, 10) };
  }
  if (isActive === 'true' || isActive === 'false') {
    filter.isActive = isActive === 'true';
  }

  if (idUser) {
    filter.where = {
      '$user.id$': idUser,
    } as { [key: string]: unknown };
  }

  if (order) {
    const stringOrder = order as string;

    const [by, through] = stringOrder.replace(' ', '').split(',');

    filter.order = [{ by: by as 'ASC' | 'DESC', through: through as keyof AboutMeDto }];
  } else {
    filter.order = [{ by: 'DESC', through: 'id' as keyof AboutMeDto }];
  }

  return filter;
}

function acessMetricsFilter(query: ParsedQs): ServiceFilter<AcessMetricsDto> {
  const { id, order, id_user: idUser, initial_date: initialDate, final_date: finalDate } = query;

  const filter: ServiceFilter<AcessMetricsDto> = {
    where: {},
  };

  if (id) {
    filter.where = { ...filter.where, id: parseInt(id as string, 10) };
  }

  if (idUser) {
    filter.where = {
      ...filter.where,
      '$user.id$': idUser,
    } as { [key: string]: unknown };
  }

  if (initialDate && !finalDate) {
    filter.where = {
      ...filter.where,
      $date$: {
        [Op.gte]: initialDate,
      },
    } as { [key: string]: unknown };
  }

  if (!initialDate && finalDate) {
    filter.where = {
      ...filter.where,
      $date$: {
        [Op.lte]: finalDate,
      },
    } as { [key: string]: unknown };
  }

  if (initialDate && finalDate) {
    filter.where = {
      ...filter.where,
      $date$: {
        [Op.between]: [initialDate, finalDate],
      },
    } as { [key: string]: unknown };
  }

  if (order) {
    const stringOrder = order as string;

    const [by, through] = stringOrder.replace(' ', '').split(',');

    filter.order = [{ by: by as 'ASC' | 'DESC', through: through as keyof AcessMetricsDto }];
  } else {
    filter.order = [{ by: 'DESC', through: 'id' as keyof AcessMetricsDto }];
  }

  return filter;
}

export default {
  projectFilter,
  skillFilter,
  aboutMeFilter,
  acessMetricsFilter,
};
