import moment from 'moment'
import 'moment/locale/pt-br'
import 'moment-timezone'

moment.locale('pt-br')

const dateFormat = (timestamp: string, atraso: boolean) => {
  const convertUnixToDate = moment.unix(Number(timestamp))
  const date = convertUnixToDate.format('DD/MM/YYYY')
  const dataAtraso = convertUnixToDate.fromNow()

  return atraso ? dataAtraso : date
}

export default dateFormat