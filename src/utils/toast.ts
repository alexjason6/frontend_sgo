import EventManager from '../libs/EventManager'

export const toastEventManager = new EventManager()

interface Message {
  type: 'default' | 'success' | 'danger'
  text: string
  duration?: number
}

const Toast = ({ type, text, duration }: Message) => {
  toastEventManager.emit('addtoast', { type, text, duration })
}

export default Toast
