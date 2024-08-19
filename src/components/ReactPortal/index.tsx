import type React from 'react'
import { type ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface TypePortal {
  containerId: string
  children: ReactNode
}

const ReactPortal: React.FC<TypePortal> = ({ containerId, children }) => {
  let element = document.getElementById(containerId)

  if (!element) {
    element = document.createElement('div')
    element.setAttribute('id', containerId)
    document.body.appendChild(element)
  }

  return ReactDOM.createPortal(children, element)
}

export default ReactPortal
