import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateEtapasParams {
  token: string
  data: any
}

interface ListOrcamentosParams {
  token: string
}

class EtapasServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async listEtapas ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/etapas/list', {
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

  async listSubetapas ({ token }: ListOrcamentosParams) {
    try {
      const response = await this.httpClient.get('/api/subetapas/list', {
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

  async etapasCreate ({ token, data }: ValidateCreateEtapasParams) {
    try {
      const response = await this.httpClient.post('/api/etapas/create', {
        headers: {
          Authorization: token
        },
        data
      })

      return response
    } catch (error) {
      console.error('Erro ao criar etapa', error)
      throw new Error('Falha na criação de etapas.')
    }
  }

  async subetapasCreate ({ token, data }: ValidateCreateEtapasParams) {
    try {
      const response = await this.httpClient.post('/api/subetapas/create', {
        headers: {
          Authorization: token
        },
        data
      })

      return response
    } catch (error) {
      console.error('Erro ao criar subetapa', error)
      throw new Error('Falha na criação de subetapa.')
    }
  }

  async etapaUpdate ({ token, data }: ValidateCreateEtapasParams) {
    try {
      const response = await this.httpClient.post('/api/etapas/update/', {
        headers: {
          Authorization: token
        },
        data
      })

      return response
    } catch (error) {
      console.error('Erro ao editar etapa', error)
      throw new Error('Falha na edição de etapas.')
    }
  }

  async subetapaUpdate ({ token, data }: ValidateCreateEtapasParams) {
    try {
      const response = await this.httpClient.post('/api/subetapas/update/', {
        headers: {
          Authorization: token
        },
        data
      })

      return response
    } catch (error) {
      console.error('Erro ao editar subetapa', error)
      throw new Error('Falha na edição de subetapas.')
    }
  }
}
export default new EtapasServices()
