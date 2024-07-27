export default function WellcomeMessage () {
  const renderWelcomeMsg = (currentTime = new Date()) => {
    const currentHour = currentTime.getHours()
    const splitAfternoon = 12 // 24hr time to split the afternoon
    const splitEvening = 17 // 24hr time to split the evening

    if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
      // Between 12 PM and 5PM
      return 'boa tarde'
    }
    if (currentHour >= splitEvening) {
      // Between 5PM and Midnight
      return 'boa noite'
    }
    // Between dawn and noon
    return 'bom dia'
  }

  const mensagem = renderWelcomeMsg()

  return mensagem
}
