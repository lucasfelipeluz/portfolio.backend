type ExpiresIn = '1d' | '5d' | '10d' | '30d' | '1y';

type AuthConfig = {
  salt: number;
  expiresIn: ExpiresIn;
  secretKey: string;
};

export { AuthConfig, ExpiresIn };
