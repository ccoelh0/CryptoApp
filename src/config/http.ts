import axios, { AxiosResponse } from "axios";

export default class HttpService {
  private basePath: string;

  private readonly httpInstance;

  constructor(path = "", config: any = {}) {
    this.basePath = path;
    this.httpInstance = axios.create(config);
  }

  public get<T = any, D = any>(
    url: string,
    options: any = {}
  ): Promise<AxiosResponse<T, D>> {
    return this.httpInstance.get(`${this.basePath}${url}`, options);
  }

  public post<T = any, D = any>(
    url: string,
    options: any = {}
  ): Promise<AxiosResponse<T, D>> {
    const { data = {}, ...rest } = options;
    return this.httpInstance.post(`${this.basePath}${url}`, data, rest);
  }

  public put<T = any, D = any>(
    url: string,
    options: any = {}
  ): Promise<AxiosResponse<T, D>> {
    const { data = {}, ...rest } = options;
    return this.httpInstance.put(`${this.basePath}${url}`, data, rest);
  }
}
