import HttpClientSgo from '../utils/HttpCliente'
import { url } from '../utils/urlServices'

/* interface ValidateTokenParams {
  token: string
} */

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
}

export default new ObrasServices()
