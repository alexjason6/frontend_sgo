import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

interface ValidateCreateObrasParams {
  token: string
  mapperObra: any
}

interface ListObrasParams {
  token: string
}

class ObrasServices {
  private readonly httpClient: HttpClientSgo

  constructor () {
    this.httpClient = new HttpClientSgo(url)
  }

  async list ({ token }: ListObrasParams) {
    try {
      const response = await this.httpClient.get('/api/obras/list', {
        headers: {
          Authorization: token
        }
      })
      return response
    } catch (error) {
      console.error('Erro ao listar obras:', error)
      throw new Error('Falha na listagem de obras.')
    }
  }

  async create ({ token, mapperObra }: ValidateCreateObrasParams) {
    try {
      const response = await this.httpClient.post('/api/obras/create', {
        headers: {
          Authorization: token
        },
        data: mapperObra
      })

      return response
    } catch (error) {
      console.error('Erro ao criar cliente', error)
      throw new Error('Falha na criação de cliente.')
    }
  }

  async update ({ token, mapperObra }: ValidateCreateObrasParams) {
    try {
      const response = await this.httpClient.post('/api/clientes/create', {
        headers: {
          Authorization: token
        },
        data: mapperObra
      })

      return response
    } catch (error) {
      console.error('Erro ao criar cliente', error)
      throw new Error('Falha na criação de cliente.')
    }
  }
}
export default new ObrasServices()
