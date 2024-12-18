import HttpClientSgo from "../utils/HttpCliente";
import { url } from "../utils/urlServices";

interface ValidateCreateRdoRdaParams {
  token: string;
  type?: string;
  mapperLancamento?: any;
  mapperRdoRda?: any;
  id?: string | number;
}

interface ListRdoRdaParams {
  token: string;
}

class RdoRdaServices {
  private readonly httpClient: HttpClientSgo;

  constructor() {
    this.httpClient = new HttpClientSgo(url);
  }

  async listRdo({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get("/api/rdo/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar RDOs:", error);
      throw new Error("Falha na listagem de RDOs.");
    }
  }

  async listLancamentosRdo({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get("/api/rdo/lancamentos/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar lançamentos:", error);
      throw new Error("Falha na listagem de lançamentos.");
    }
  }

  async createRdoRda({
    token,
    mapperRdoRda,
    type,
  }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(`/api/${type}/create`, {
        headers: {
          Authorization: token,
        },
        data: mapperRdoRda,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar orcçamento", error);
      throw new Error("Falha na criação de orcçamento.");
    }
  }

  async createLancamentoRdoRda({
    token,
    mapperLancamento,
    type,
  }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(
        `/api/${type}/lancamentos/create`,
        {
          headers: {
            Authorization: token,
          },
          data: mapperLancamento,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar documento", error);
      throw new Error("Falha na criação de documento.");
    }
  }

  async updateLancamento({
    token,
    mapperLancamento,
    type,
    id,
  }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.put(
        `/api/${type}/lancamentos/edit/${id}`,
        {
          headers: {
            Authorization: token,
          },
          data: mapperLancamento,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao criar documento", error);
      throw new Error("Falha na criação de documento.");
    }
  }

  async getLancamentoRdo({ token, type, id }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.get(
        `/api/${type}/lancamentos/get/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Falha na ao buscar lançamentos.", error);
      throw new Error("Falha na ao buscar lançamentos.");
    }
  }

  async getLancamentosRdo({ token, type, id }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.get(
        `/api/${type}/lancamentos/list/obra/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response;
    } catch (error) {
      console.error("Falha na ao buscar lançamentos.", error);
      throw new Error("Falha na ao buscar lançamentos.");
    }
  }

  async updateRdoRda({
    token,
    mapperRdoRda,
    type,
  }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(`/api/${type}/edit`, {
        headers: {
          Authorization: token,
        },
        data: mapperRdoRda,
      });

      return response;
    } catch (error) {
      console.error("Erro ao editar documento", error);
      throw new Error("Falha na edição de documento.");
    }
  }

  async listRda({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get("/api/rda/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar RDAs:", error);
      throw new Error("Falha na listagem de RDAs.");
    }
  }

  async listLancamentosRda({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get("/api/rda/lancamentos/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar lançamentos:", error);
      throw new Error("Falha na listagem de lançamentos.");
    }
  }

  async deleteLancamentosRdo({ token, id }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.delete(
        `/api/rdo/lancamentos/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Erro ao listar lançamentos:", error);
      throw new Error("Falha na listagem de lançamentos.");
    }
  }
}

export default new RdoRdaServices();
