import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateOrcamentosParams {
  token: string
  mapperOrcamento: any
}

interface ListOrcamentosParams {
  token: string
}

class OrcamentosServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async list ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/orcamentos/list', {
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

  async listTipos ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/orcamentos/modelos/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar os modelos de orçamentos:', error)
      throw new Error('Falha na listagem de modelos de orçamentos.')
    }
  }

  async create ({ token, mapperOrcamento }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post('/api/orcamentos/create', {
        headers: {
          Authorization: token
        },
        data: mapperOrcamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar orcçamento', error)
      throw new Error('Falha na criação de orcçamento.')
    }
  }

  async update ({ token, mapperOrcamento }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post('/api/orcamentos/create', {
        headers: {
          Authorization: token
        },
        data: mapperOrcamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar orcçamento', error)
      throw new Error('Falha na criação de orcçamento.')
    }
  }
}
export default new OrcamentosServices()
