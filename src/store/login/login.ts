import { Module } from "vuex";
import { ILoginState } from "./type";
import { IRootState } from "./../type";
import { IAccount } from "@/service/type";
import router from "@/router";
import { mapMenuToRoutes } from "@/utils/map-menus";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import localCache from "@/utils/cache";
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenu: [],
      permissions: [],
    };
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload);
      const { token, id } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenu = userMenuResult.data;
      console.log(userMenu, "------------");
      commit("changeUeserMenus", userMenu);
      localCache.setCache("userMenus", userMenu);
      router.push("/main");
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUeserMenus", userMenus);
      }
    },
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfoResult: any) {
      state.userInfo = userInfoResult;
    },
    changeUeserMenus(state, userMenu: any) {
      state.userMenu = userMenu;
      console.log(userMenu);
      // 动态注册路由
      const routes = mapMenuToRoutes(userMenu);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    },
  },
};

export default loginModule;
