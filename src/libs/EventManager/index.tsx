type Listener<T = any> = (payload: T) => void

class EventManager<EventMap extends Record<string, any>> {
  private listeners: {
    [K in keyof EventMap]?: Array<Listener<EventMap[K]>>;
  } = {}

  // Método 'on' para adicionar ouvintes
  on<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]!.push(listener)
  }

  // Método 'emit' para emitir eventos e notificar ouvintes
  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event]!.forEach((listener) => {
      listener(payload)
    })
  }

  // Método 'removeListener' para remover ouvintes
  removeListener<K extends keyof EventMap>(event: K, listenerToRemove: Listener<EventMap[K]>) {
    const listeners = this.listeners[event]

    if (!listeners) {
      return
    }

    this.listeners[event] = listeners.filter((listener) => listener !== listenerToRemove)
  }
}

export default EventManager
