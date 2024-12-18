import HttpClientSgo from "../utils/HttpCliente";
import { url } from "../utils/urlServices";

interface ValidateCreateFornecedoresParams {
  token: string;
  id?: number;
  mapperFornecedores: {
    id?: number;
    nome: string;
    razao_social: string;
    cpf_cnpj: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    inscricao_municipal?: string;
    inscricao_estadual?: string;
    responsavel: string;
    responsavel_financeiro: string;
    telefone_financeiro: string;
    email_financeiro: string;
    status: number;
  };
}

interface ListFornecedoresParams {
  token: string;
}

class FornecedoresServices {
  private readonly httpClient: HttpClientSgo;

  constructor() {
    this.httpClient = new HttpClientSgo(url);
  }

  async list({ token }: ListFornecedoresParams) {
    try {
      const response = await this.httpClient.get("/api/fornecedores/list", {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao listar os fornecedores", error);
      throw new Error("Falha na listagem de fornecedores.");
    }
  }

  async create({
    token,
    mapperFornecedores,
  }: ValidateCreateFornecedoresParams) {
    try {
      const response = await this.httpClient.post("/api/fornecedores/create", {
        headers: {
          Authorization: token,
        },
        data: mapperFornecedores,
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar fornecedores", error);
      throw new Error("Falha na criação de fornecedores.");
    }
  }

  async update({
    token,
    id,
    mapperFornecedores,
  }: ValidateCreateFornecedoresParams) {
    try {
      const response = await this.httpClient.put(
        `/api/fornecedores/edit/${id}`,
        {
          headers: {
            Authorization: token,
          },
          data: mapperFornecedores,
        }
      );

      return response;
    } catch (error) {
      console.error("Erro ao editar o fornecedor", error);
      throw new Error("Falha na edição do fornecedor.");
    }
  }
}

export default new FornecedoresServices();
