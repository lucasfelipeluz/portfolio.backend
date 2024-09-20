import { AboutMeDto, ProjectDto, SkillDto } from '@/application/dtos';
import { ServiceFilter } from '@/core/types';
import { ParsedQs } from 'qs';

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

export default {
  projectFilter,
  skillFilter,
  aboutMeFilter,
};
