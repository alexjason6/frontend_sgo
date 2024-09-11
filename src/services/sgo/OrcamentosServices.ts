import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateOrcamentosParams {
  token: string
  mapperOrcamento?: any
  mapperItem?: any
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
      throw new Error('Falha na criação de orçamento.')
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
      throw new Error('Falha na criação de orçamento.')
    }
  }

  async listItens ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/orcamentos/itens/list', {
        headers: {
          Authorization: token
        }
      })

      return response
    } catch (error) {
      console.error('Erro ao listar etapas:', error)
      throw new Error('Falha na listagem de etapas.')
    }
  }

  async listSubitens ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/orcamentos/subitens/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar subetapas:', error)
      throw new Error('Falha na listagem de subetapas.')
    }
  }

  async createItem ({ token, mapperItem }: ValidateCreateOrcamentosParams) {
    try {
      const response = await this.httpClient.post('/api/orcamentos/itens/create', {
        headers: {
          Authorization: token
        },
        data: mapperItem
      })

      return response
    } catch (error) {
      console.error('Erro ao criar item para o orçamento', error)
      throw new Error('Falha na criação de item de orçamento.')
    }
  }
}
export default new OrcamentosServices()
