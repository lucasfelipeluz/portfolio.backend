import { ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { Entity } from '@/domain/entities';
import { FindOptions, Order, UpdateOptions, WhereOptions } from 'sequelize';

/**
 * Transforma um objeto de filtros da aplicação em objeto de busca para o sequelize.
 *
 * @param filters - Objeto contendo os filtros de serviço.
 * @returns Objeto com as opções de busca transformadas.
 */
function serviceFilterToModelFilter<D, M>(filters: ServiceFilter<D>): FindOptions<M> {
  const newFilters: FindOptions<Entity> = {
    where: filters.where
      ? { ...filters.where, ...(filters.isActive && { isActive: filters.isActive }) }
      : filters.isActive !== undefined
        ? { isActive: filters.isActive !== undefined }
        : undefined,
    limit: filters.limit,
    offset: filters.offset,
    order:
      filters.order && filters.order.length > 0
        ? (filters.order.map(({ through, by }) => [through, by]) as Order)
        : undefined,
    attributes: filters.attributes
      ? {
          exclude: (filters.attributes.exclude as string[]) || [],
          include: (filters.attributes.include as string[]) || [],
        }
      : undefined,
  };
  return newFilters;
}

function updateServiceFilterToModelUpdateFilter<D, M>(
  filters: UpdateServiceOptions<D>,
): UpdateOptions<M> {
  const newFilters: UpdateOptions<M> = {
    where: {
      ...filters.where,
      ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    } as WhereOptions<M> & { isActive?: boolean },
    logging: filters.logging,
    silent: filters.silent,
    limit: filters.limit,
  };

  return newFilters;
}

export default {
  serviceFilterToModelFilter,
  updateServiceFilterToModelUpdateFilter,
};
