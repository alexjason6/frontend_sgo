import axios from 'axios'

class SerproService {
  async buscaCpf (cpf: string) {
    const data = new URLSearchParams({
      grant_type: 'client_credentials'
    })

    const response = await axios.post('https://gateway.apiserpro.serpro.gov.br/token', data.toString(), {
      headers: {
        Authorization: 'Basic NjNyS19mRk9qODF2TTlEVFBGd2F5bENDdlNNYTowVmhVeHVIVk9wMEhqSzlvaDhKSlFMZGwyWm9h',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.data.access_token) {
      const dataCpf = await axios.get(`https://gateway.apiserpro.serpro.gov.br/consulta-cpf-df/v1/cpf/${cpf}`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      return dataCpf
    }
  }

  async buscaCnpj (cnpj: string) {
    const data = new URLSearchParams({
      grant_type: 'client_credentials'
    })

    const response = await axios.post('https://gateway.apiserpro.serpro.gov.br/token', data.toString(), {
      headers: {
        Authorization: 'Basic NjNyS19mRk9qODF2TTlEVFBGd2F5bENDdlNNYTowVmhVeHVIVk9wMEhqSzlvaDhKSlFMZGwyWm9h',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (response.data.access_token) {
      const dataCpf = await axios.get(`https://gateway.apiserpro.serpro.gov.br/consulta-cnpj-df/v2/basica/${cnpj}`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
          'Content-Type': 'application/json'
        }
      })

      return dataCpf
    }
  }
}

export default new SerproService()
