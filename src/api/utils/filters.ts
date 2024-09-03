import { ProjectDto, SkillDto } from '@/application/dtos';
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

export default {
  projectFilter,
  skillFilter,
};
