import axios from "axios";
import type { AxiosInstance } from "axios";
import { RequestInterceptors, RequestConfig } from "./type";
import { ElLoading } from "element-plus";
const DEFAULT_LOADING = true;

class axiosRequest {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  showLoading: boolean;
  loading?: any;
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;
    // 将config中的拦截器传入
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );

    // 设置通用的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据。。。。。",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        return err;
      },
    );

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        if (data.returnCode == "-1001") {
          console.log("请求失败————————————————————————————");
        } else {
          return data;
        }
      },
      (err) => {
        this.loading?.close();
        if (err.response.status === "404") {
          console.log("页面不存在");
        }
        return err;
      },
    );
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default axiosRequest;
