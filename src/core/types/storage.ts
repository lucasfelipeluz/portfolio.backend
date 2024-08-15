export interface StorageItem {
  key: string;
  lastModified: Date;
  size: number;
}

export interface CreateStorageItem {
  folder: string;
  filename: string;
  base64: string;
}

export interface DeleteStorageItem {
  folder: string;
  filename: string;
}

export interface StorageConfig {
  temporaryFolder: string;
  acessId: string;
  password: string;
  container: string;
}
