import { IAccount, IDataType, ILoginResult } from "../type";
import httpRequest from "./../index";

enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  userMenus = "/role/",
}
export function accountLoginRequest(account: IAccount) {
  return httpRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return httpRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return httpRequest.get<IDataType>({
    url: LoginApi.userMenus + id + "/menu",
    showLoading: false,
  });
}
