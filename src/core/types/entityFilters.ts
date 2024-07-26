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

export { ServiceFilter, UpdateServiceOptions };
