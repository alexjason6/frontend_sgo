/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
import HttpClientSgo from "../utils/HttpCliente";
import { url } from "../utils/urlServices";

interface ValidateCreateOrcamentosParams {
  token: string;
  id?: number;
  mapperOrcamento?: any;
  mapperItem?: any;
  mapperModelo?: any;
  mapperSubitem?: any;
}

interface ListOrcamentosParams {
  token: string;
}

class OrcamentosServices {
  private readonly httpClient: HttpClientSgo;

  constructor() {
    this.httpClient = new HttpClientSgo(url);
  }

  async list({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get("/api/orcamentos/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar orçamentos:", error);
      throw new Error("Falha na listagem de orçamentos.");
    }
  }

  async get({ token, id }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.get(`/api/orcamentos/get/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao buscar orçamento:", error);
      throw new Error("Falha na busca de orçamento.");
    }
  }

  async listTipos({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get(
        "/api/orcamentos/modelos/list",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Erro ao listar os modelos de orçamentos:", error);
      throw new Error("Falha na listagem de modelos de orçamentos.");
    }
  }

  async create({ token, mapperOrcamento }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post("/api/orcamentos/create", {
        headers: {
          Authorization: token,
        },
        data: mapperOrcamento,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar orçamento", error);
      throw new Error("Falha na criação de orçamento.");
    }
  }

  async update({ token, mapperOrcamento }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.put(
        `/api/orcamentos/edit/${mapperOrcamento.id}`,
        {
          headers: {
            Authorization: token,
          },
          data: mapperOrcamento,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar orçamento", error);
      throw new Error("Falha na criação de orçamento.");
    }
  }

  async delete({ token, id }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.delete(
        `/api/orcamentos/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao deletar orçamento", error);
      throw new Error("Falha na remoção de orçamento.");
    }
  }

  async listItens({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get("/api/orcamentos/itens/list", {
        headers: {
          Authorization: token,
        },
      });

      return response;
    } catch (error) {
      console.error("Erro ao listar etapas:", error);
      throw new Error("Falha na listagem de etapas.");
    }
  }

  async listSubitens({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get(
        "/api/orcamentos/subitens/list",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Erro ao listar subetapas:", error);
      throw new Error("Falha na listagem de subetapas.");
    }
  }

  async createItem({ token, mapperItem }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post(
        "/api/orcamentos/itens/create",
        {
          headers: {
            Authorization: token,
          },
          data: mapperItem,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar item para o orçamento", error);
      throw new Error("Falha na criação de item de orçamento.");
    }
  }

  async createSubitem({
    token,
    mapperSubitem,
  }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post(
        "/api/orcamentos/subitens/create",
        {
          headers: {
            Authorization: token,
          },
          data: mapperSubitem,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar item para o orçamento", error);
      throw new Error("Falha na criação de item de orçamento.");
    }
  }

  async createModelo({ token, mapperModelo }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post(
        "/api/orcamentos/modelos/create",
        {
          headers: {
            Authorization: token,
          },
          data: mapperModelo,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar modelo de orçamento", error);
      throw new Error("Falha na edição de modelo de orçamento.");
    }
  }
}
export default new OrcamentosServices();
