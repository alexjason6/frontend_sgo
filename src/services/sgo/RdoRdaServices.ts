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

  async updateRdo ({ token, mapperLancamento }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post('/api/rdo/create', {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao editar lançamento', error)
      throw new Error('Falha na edição de lançamento.')
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

  async createRda ({ token, mapperLancamento }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post('/api/rda/lancamentos/create', {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao criar lançamento', error)
      throw new Error('Falha na criação de lançamento.')
    }
  }

  async updateRda ({ token, mapperLancamento }: ValidateCreateRdoRdaParams) {
    try {
      const response = await this.httpClient.post('/api/rda/create', {
        headers: {
          Authorization: token
        },
        data: mapperLancamento
      })

      return response
    } catch (error) {
      console.error('Erro ao editar lançamento', error)
      throw new Error('Falha na edição de lançamento.')
    }
  }
}
export default new RdoRdaServices()
