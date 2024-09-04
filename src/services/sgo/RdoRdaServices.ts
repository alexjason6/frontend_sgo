import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateRdoRdaParams {
  token: string
  mapperLancamento: any
}

interface ListRdoRdaParams {
  token: string
}

class RdoRdaServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async listRdo ({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get('/api/rdo/lancamentos/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar orçamentos:', error)
      throw new Error('Falha na listagem de orçamentos.')
    }
  }

  async createRdo ({ token, mapperLancamento }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post('/api/rdo/lancamentos/create', {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar orcçamento', error)
      throw new Error('Falha na criação de orcçamento.')
    }
  }

  async update ({ token, mapperLancamento }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post('/api/RdoRda/create', {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar orcçamento', error)
      throw new Error('Falha na criação de orcçamento.')
    }
  }
}
export default new RdoRdaServices()
