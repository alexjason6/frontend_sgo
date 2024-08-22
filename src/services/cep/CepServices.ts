import axios from 'axios'

class CepService {
  async buscaCep (cep: string) {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)

    return response
  }
}

export default new CepService()
