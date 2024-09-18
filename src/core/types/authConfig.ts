type ExpiresIn = '1d' | '5d' | '10d' | '30d' | '1y';

type AuthConfig = {
  salt: number;
  expiresIn: ExpiresIn;
  secretKey: string;
};

type PayloadAuthUser = {
  id: string;
  name: string;
  email: string;
  number: string;
  role: string;
};

export { AuthConfig, ExpiresIn, PayloadAuthUser };
