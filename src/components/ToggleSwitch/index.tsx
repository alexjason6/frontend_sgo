import React from 'react'

import { SwitchButton, SwitchLabel, SwitchInput } from './styles'

interface TypeToggleSwitch {
  name: string
  checked: boolean
  onChange: () => void
}

const Switch: React.FC<TypeToggleSwitch> = ({ name, checked, onChange }) => {
  return (
    <>
      <SwitchInput
        className="switch-checkbox"
        id={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <SwitchLabel $checked={checked} className="switch-label" htmlFor={name}>
        <SwitchButton className="switch-button" />
      </SwitchLabel>
    </>
  )
}

export default Switch
