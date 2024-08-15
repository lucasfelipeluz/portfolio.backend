import { ApplicationError } from '@/core/errors';
import { CreateStorageItem, StorageItem } from '@/core/types';
import { DeleteStorageItem, StorageConfig } from '@/core/types/storage';
import { strings, transform } from '@/core/utils';
import { IApplicationConfigProvider, IStorageProvider } from '@/infrastructure/interfaces';
import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import * as path from 'node:path';
import { injectable } from 'tsyringe';
import ApplicationConfigProvider from './ApplicationConfigProvider';

@injectable()
class StorageProvider implements IStorageProvider {
  private readonly client: S3Client;
  private readonly applicationConfigProvider: IApplicationConfigProvider;
  private readonly storageConfig: StorageConfig;

  constructor(applicationConfigProvider: ApplicationConfigProvider) {
    this.applicationConfigProvider = applicationConfigProvider;

    this.storageConfig = this.applicationConfigProvider.getStorageConfig();

    const options: S3ClientConfig = {
      region: strings.awsLocationSaEast1,
      credentials: {
        accessKeyId: this.storageConfig.acessId,
        secretAccessKey: this.storageConfig.password,
      },
    };

    this.client = new S3Client(options);
  }

  private createTemporaryFolderIfNotExists(): void {
    const isExistsTemporaryFolder = existsSync(this.storageConfig.temporaryFolder);

    if (!isExistsTemporaryFolder) {
      mkdirSync(this.storageConfig.temporaryFolder);
    }
  }

  async getAll(): Promise<StorageItem[]> {
    try {
      const command = new ListObjectsV2Command({ Bucket: this.storageConfig.container });

      const resultCommand = await this.client.send(command);

      const result = transform.awsListObjectsV2ToStorageItem(resultCommand);

      return result;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(strings.errorStorage);
    }
  }

  async create(data: CreateStorageItem): Promise<StorageItem> {
    try {
      this.createTemporaryFolderIfNotExists();

      const extensionFile = data.base64.split(';')[0].split('/')[1];

      data.filename = `${data.filename}.${extensionFile}`;
      data.base64 = data.base64.split(',')[1];

      const key = `${data.folder}/${data.filename}`;

      const bufferFile = Buffer.from(data.base64, 'base64');

      const storageConfig = this.applicationConfigProvider.getStorageConfig();

      writeFileSync(`${storageConfig.temporaryFolder}/${data.filename}`, bufferFile);

      const originalPath = path.resolve(storageConfig.temporaryFolder, data.filename);

      const command = new PutObjectCommand({
        Key: key,
        Body: bufferFile,
        Bucket: this.storageConfig.container,
        ContentType: extensionFile,
      });

      await this.client.send(command);

      unlinkSync(originalPath);

      return {
        key: key,
        lastModified: new Date(),
        size: 0,
      } as StorageItem;
    } catch (error) {
      console.log(error);
      throw new ApplicationError(strings.errorStorage);
    }
  }

  async delete(data: DeleteStorageItem): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.storageConfig.container,
        Key: `${data.folder}/${data.filename}`,
      });

      await this.client.send(command);
    } catch (error) {
      console.log(error);
      throw new ApplicationError(strings.errorStorage);
    }
  }
}

export default StorageProvider;
