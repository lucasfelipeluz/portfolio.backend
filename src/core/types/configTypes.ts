type ConfigType = {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
  logging: boolean;
};

type ConfigTypes = {
  development: ConfigType;
  test: ConfigType;
  production: ConfigType;
};

export default ConfigTypes;
