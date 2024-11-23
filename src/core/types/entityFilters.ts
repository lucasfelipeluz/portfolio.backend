import { Transaction } from 'sequelize';

/**
 * A default filter for the application layer or API layer
 */
type ApplicationFilter<Dto> = {
  where?: {
    [K in keyof Dto]?: Dto[K] | Dto[K][];
  };
  isActive?: boolean;
  order?: {
    through: keyof Dto;
    by: 'ASC' | 'DESC';
  }[];
  limit?: number;
  offset?: number;
  attributes?: {
    exclude?: (keyof Dto)[];
    include?: (keyof Dto)[];
  };
  query: string;
};

/**
 * Options for creating an entity
 */
type ApplicationEntityCreatingOptions = {
  logging?: boolean;
  transaction?: Transaction;
};

/**
 * Options for updating an entity
 */
type ApplicationEntityUpdatingOptions<Dto> = {
  where?: {
    [K in keyof Dto]?: Dto[K] | Dto[K][];
  };
  isActive?: boolean;
  silent?: boolean;
  limit?: number;
  logging?: boolean;
};

type ApplicationEntityDeletingOptions<Dto> = {
  where?: {
    [K in keyof Dto]?: Dto[K] | Dto[K][];
  };
  silent?: boolean;
  limit?: number;
  logging?: boolean;
};

type ServiceFilter<T> = {
  where?: {
    [K in keyof T]?: T[K] | T[K][];
  };
  isActive?: boolean;
  order?: {
    through: keyof T;
    by: 'ASC' | 'DESC';
  }[];
  limit?: number;
  offset?: number;
  attributes?: {
    exclude?: (keyof T)[];
    include?: (keyof T)[];
  };
  query: string;
};

type CreateServiceOptions = {
  transaction?: unknown;
};

type UpdateServiceOptions<T> = {
  where?: {
    [K in keyof T]?: T[K] | T[K][];
  };
  isActive?: boolean;
  silent?: boolean;
  limit?: number;
  logging?: boolean;
};

export {
  ApplicationFilter,
  ApplicationEntityCreatingOptions,
  ApplicationEntityUpdatingOptions,
  ApplicationEntityDeletingOptions,
  ServiceFilter,
  UpdateServiceOptions,
  CreateServiceOptions,
};
