import axios, { type AxiosRequestConfig, type Method } from "axios";

class HttpClientSgo {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async post(path: string, options: AxiosRequestConfig) {
    return await this.makeRequest(path, options, "POST");
  }

  async get(path: string, options: AxiosRequestConfig) {
    return await this.makeRequest(path, options, "GET");
  }

  async put(path: string, options: AxiosRequestConfig) {
    return await this.makeRequest(path, options, "PUT");
  }

  async delete(path: string, options: AxiosRequestConfig) {
    return await this.makeRequest(path, options, "DELETE");
  }

  private async makeRequest(
    path: string,
    options: AxiosRequestConfig,
    method: Method
  ) {
    try {
      const response = await axios({
        url: `${this.baseURL}${path}`,
        method,
        ...options, // Inclui headers e body diretamente
      });

      return response.data; // O Axios já retorna a resposta no formato JSON
    } catch (error) {
      // Adicione tratamento de erro adequado aqui
      return error;
    }
  }
}

export default HttpClientSgo;
