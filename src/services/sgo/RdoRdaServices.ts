import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateRdoRdaParams {
  token: string
  type?: string
  mapperLancamento?: any
  mapperRdoRda?: any
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
      const response = await this.httpClient.get('/api/rdo/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar RDOs:', error)
      throw new Error('Falha na listagem de RDOs.')
    }
  }

  async listLancamentosRdo ({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get('/api/rdo/lancamentos/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar lançamentos:', error)
      throw new Error('Falha na listagem de lançamentos.')
    }
  }

  async createRdoRda ({ token, mapperRdoRda, type }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(`/api/${type}/create`, {
        headers: {
          Authorization: token
        },
        data: mapperRdoRda
      })

      return response
    } catch (error) {
      console.error('Erro ao criar orcçamento', error)
      throw new Error('Falha na criação de orcçamento.')
    }
  }

  async createLancamentoRdoRda ({ token, mapperLancamento, type }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(`/api/${type}/lancamentos/create`, {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar documento', error)
      throw new Error('Falha na criação de documento.')
    }
  }

  async updateRdoRda ({ token, mapperRdoRda, type }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post(`/api/${type}/edit`, {
        headers: {
          Authorization: token
        },
        data: mapperRdoRda
      })

      return response
    } catch (error) {
      console.error('Erro ao editar documento', error)
      throw new Error('Falha na edição de documento.')
    }
  }

  async listRda ({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get('/api/rda/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar RDAs:', error)
      throw new Error('Falha na listagem de RDAs.')
    }
  }

  async listLancamentosRda ({ token }: ListRdoRdaParams) {
    try {
      const response = await this.httpClient.get('/api/rda/lancamentos/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar lançamentos:', error)
      throw new Error('Falha na listagem de lançamentos.')
    }
  }
}
export default new RdoRdaServices()
