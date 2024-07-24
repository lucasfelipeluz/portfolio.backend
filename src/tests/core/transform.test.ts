/* eslint-disable max-len */
import { ServiceFilter, UpdateServiceOptions } from '@/core/types';
import { transform } from '@/core/utils';

describe('Transform Method: ServiceFilterToModelFilter', () => {
  it('should transform a isActive`s service filter to a where property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      isActive: true,
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('where');
    expect(modelFilter.where).toHaveProperty('isActive', true);
  });

  it('should transform a where properties of service to a where property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      where: {
        name: 'John Doe',
      },
      isActive: true,
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('where');
    expect(modelFilter.where).toHaveProperty('name', 'John Doe');
    expect(modelFilter.where).toHaveProperty('isActive', true);
  });

  it('should transform a limit property of service to a limit property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      limit: 10,
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('limit', 10);
  });

  it('should transform a offset property of service to a offset property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      offset: 10,
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('offset', 10);
  });

  it('should transform a order property of service to a order property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      order: [
        { through: 'id' as never, by: 'ASC' },
        { through: 'name' as never, by: 'DESC' },
      ],
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('order');
    expect(modelFilter.order).toContainEqual(['id', 'ASC']);
    expect(modelFilter.order).toContainEqual(['name', 'DESC']);
  });

  it('should transform a attributes property of service to a attributes property in Model Filter', () => {
    const serviceFilter: ServiceFilter<unknown> = {
      attributes: {
        exclude: ['id' as never, 'isActive' as never],
        include: ['name' as never, 'email' as never],
      },
    };

    const modelFilter = transform.serviceFilterToModelFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('attributes');
    expect(modelFilter.attributes).toHaveProperty('exclude');
    expect(modelFilter.attributes).toHaveProperty('include');
    expect(JSON.stringify(modelFilter.attributes)).toBe(
      JSON.stringify({
        exclude: ['id', 'isActive'],
        include: ['name', 'email'],
      }),
    );
  });
});

describe('Transform Method: UpdateServiceFilterToModelUpdateFilter', () => {
  it('should transform a isActive`s service filter to a where property in Model Update Filter', () => {
    const serviceFilter: UpdateServiceOptions<unknown> = {
      isActive: true,
    };

    const modelFilter = transform.updateServiceFilterToModelUpdateFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('where');
    expect(modelFilter.where).toHaveProperty('isActive', true);
  });

  it('should transform a where properties of service to a where property in Model Update Filter', () => {
    const serviceFilter: UpdateServiceOptions<unknown> = {
      where: {
        name: 'John Doe',
      },
      isActive: true,
    };

    const modelFilter = transform.updateServiceFilterToModelUpdateFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('where');
    expect(modelFilter.where).toHaveProperty('name', 'John Doe');
    expect(modelFilter.where).toHaveProperty('isActive', true);
  });

  it('should transform a limit property of service to a limit property in Model Update Filter', () => {
    const serviceFilter: UpdateServiceOptions<unknown> = {
      limit: 10,
    };

    const modelFilter = transform.updateServiceFilterToModelUpdateFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('limit', 10);
  });

  it('should transform a silent property of service to a silent property in Model Update Filter', () => {
    const serviceFilter: UpdateServiceOptions<unknown> = {
      silent: true,
    };

    const modelFilter = transform.updateServiceFilterToModelUpdateFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('silent', true);
  });

  it('should transform a logging property of service to a logging property in Model Update Filter', () => {
    const serviceFilter: UpdateServiceOptions<unknown> = {
      logging: true,
    };

    const modelFilter = transform.updateServiceFilterToModelUpdateFilter(serviceFilter);

    expect(modelFilter).toHaveProperty('logging', true);
  });
});
