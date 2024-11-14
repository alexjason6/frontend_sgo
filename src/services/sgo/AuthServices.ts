import HttpClientSgo from "../utils/HttpCliente";
import { url } from "../utils/urlServices";

interface SignInParams {
  email: string;
  password: string;
}

interface ValidateTokenParams {
  token: string;
}

interface GetUserParams {
  id: number;
  token: string;
}

class AuthServices {
  private readonly httpClient: HttpClientSgo;

  constructor() {
    this.httpClient = new HttpClientSgo(url);
  }

  async signIn({ email, password }: SignInParams): Promise<any> {
    try {
      const response = await this.httpClient.post(
        "/api/autenticacao/autenticar",
        {
          data: { email, password },
        }
      );
      return response;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      throw new Error(
        "Falha na autenticação. Por favor, verifique suas credenciais."
      );
    }
  }

  async validaToken({ token }: ValidateTokenParams): Promise<any> {
    try {
      const response = await this.httpClient.get(
        "/api/autenticacao/validatoken",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response;
    } catch (error: any) {
      console.error("Erro ao validar o token:", error);

      return error.response.data;
    }
  }

  async getUser({ id, token }: GetUserParams) {
    try {
      const response = await this.httpClient.get(`/api/users/get/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error(
        "Falha na busca por usuário. Por favor, verifique suas os dados."
      );
    }
  }
}

export default new AuthServices();
