/*
 * @Author: chenguo
 * @Date: 2025-05-23 16:37:48
 * @LastEditors: chenguo
 * @LastEditTime: 2025-05-28 16:00:20
 * @FilePath: /rich/src/utils/request.ts
 * @Description:
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export interface CreateAxiosOptions extends AxiosRequestConfig {}

export enum ContentTypeEnum {
  // json
  JSON = "application/json;charset=UTF-8",
  // form-data
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  // form-data  upload
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}

export enum RequestEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

// 封装axios
class RichRequest {
  private axiosInstance: AxiosInstance;
  private options: AxiosRequestConfig;

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config);
    this.options = config || {};
    this.setInterceptors();
  }

  private request<T>(config: AxiosRequestConfig): Promise<T> {
    let conf = { ...config, ...this.options };
    // 处理参数请求体
    if (config.method === RequestEnum.GET) {
      conf.params = config.params;
    } else {
      conf.data = config.params;
      delete conf.params;
    }
    // console.log("conf======", conf);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res: AxiosResponse<T>) => {
          resolve(res.data);
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }

  public get<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  public post<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  public put<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }

  public delete<T = unknown>(config: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  private setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.axiosInstance.interceptors.response.use((res) => {
      return res;
    }, undefined);
  }
}

function createAxios() {
  const opt: AxiosRequestConfig = {
    timeout: 60 * 1000,
    headers: { "Content-Type": ContentTypeEnum.JSON },
  };
  return new RichRequest(opt);
}

const http = createAxios();

export { http };
