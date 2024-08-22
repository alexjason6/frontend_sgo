import axios from 'axios'

class CepService {
  async buscaCep (cep: string) {
    const response = await axios(`https://viacep.com.br/ws/${cep}/json`, {
      method: 'GET'
    })

    return response
  }
}

export default new CepService()
