import { ApplicationEntityUpdatingOptions, ApplicationFilter, StorageItem } from '@/core/types';
import { Entity } from '@/domain/entities';
import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { CreateOptions, FindOptions, Order, UpdateOptions, WhereOptions } from 'sequelize';

/**
 * Transforms an application filter object into a search object for sequelize.
 */
function applicationFilterToFindOptions<Model>(
  applicationFilter: ApplicationFilter<Model>,
): FindOptions<Model> {
  const newFilters: FindOptions<Entity> = {
    where: applicationFilter.where
      ? {
          ...applicationFilter.where,
          ...(applicationFilter.isActive && { isActive: applicationFilter.isActive }),
        }
      : applicationFilter.isActive !== undefined
        ? { isActive: applicationFilter.isActive !== undefined }
        : undefined,
    limit: applicationFilter.limit,
    offset: applicationFilter.offset,
    order:
      applicationFilter.order && applicationFilter.order.length > 0
        ? (applicationFilter.order.map(({ through, by }) => [through, by]) as Order)
        : undefined,
    attributes: applicationFilter.attributes
      ? {
          exclude: (applicationFilter.attributes.exclude as string[]) || [],
          include: (applicationFilter.attributes.include as string[]) || [],
        }
      : undefined,
  };
  return newFilters;
}

function applicationCreatingOptionsToCreateOptions<Model>(
  applicationCreatingOptions: ApplicationEntityUpdatingOptions<Model>,
): CreateOptions<Model> {
  return {
    logging: applicationCreatingOptions.logging,
  } as CreateOptions<Model>;
}

function applicationUpdatingOptionsToUpdateOptions<Model>(
  applicationUpdatingOptions: ApplicationEntityUpdatingOptions<Model>,
): UpdateOptions<Model> {
  const newFilters: UpdateOptions<Model> = {
    where: {
      ...applicationUpdatingOptions.where,
      ...(applicationUpdatingOptions.isActive !== undefined && {
        isActive: applicationUpdatingOptions.isActive,
      }),
    } as WhereOptions<Model> & { isActive?: boolean },
    logging: applicationUpdatingOptions.logging,
    silent: applicationUpdatingOptions.silent,
    limit: applicationUpdatingOptions.limit,
  };

  return newFilters;
}

function applicationDeletingOptionsToUpdateOptions<Model>(
  applicationDeletingOptions: ApplicationEntityUpdatingOptions<Model>,
): UpdateOptions<Model> {
  const newFilters: UpdateOptions<Model> = {
    where: {
      ...applicationDeletingOptions.where,
      ...(applicationDeletingOptions.isActive !== undefined && {
        isActive: applicationDeletingOptions.isActive,
      }),
    } as WhereOptions<Model> & { isActive?: boolean },
    logging: applicationDeletingOptions.logging,
    silent: applicationDeletingOptions.silent,
    limit: applicationDeletingOptions.limit,
  };

  return newFilters;
}

function awsListObjectsV2ToStorageItem(
  listObjectV2CommandOutput: ListObjectsV2CommandOutput,
): StorageItem[] {
  const storageItens = listObjectV2CommandOutput.Contents?.map((object) => {
    return {
      key: object.Key,
      lastModified: object.LastModified,
      size: object.Size,
    } as StorageItem;
  });

  return storageItens || [];
}

export default {
  applicationFilterToFindOptions,
  applicationUpdatingOptionsToUpdateOptions,
  applicationCreatingOptionsToCreateOptions,
  applicationDeletingOptionsToUpdateOptions,
  awsListObjectsV2ToStorageItem,
};
