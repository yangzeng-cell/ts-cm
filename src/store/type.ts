import { ILoginState } from "./login/type";
import { ISystemState } from "./system/type";
import { IDashboardState } from "./analysis/type";
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
