export interface IAccount {
  password: string;
  name: string;
}

export interface IDataType<T = any> {
  code: number;
  data: T;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}
