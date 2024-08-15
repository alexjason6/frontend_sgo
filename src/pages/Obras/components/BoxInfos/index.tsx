import React from 'react'

import { BorderTop, Box, Legend } from './styles'

import { type TypeBoxInfos } from '../../../../interfaces/globalInterfaces'

const BoxInfos: React.FC<TypeBoxInfos> = ({ info, legend, color, opacityColor, accent }) => {
  const M2 = () => {
    return (
      <span>valor m<sup>2</sup></span>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BorderTop $color={color} $opacity={opacityColor} $accent={accent}/>
        <Box $color={color} $opacity={opacityColor} $legend={!!legend}>
          <p>{info}</p>
          <Legend>{legend?.includes('<sup>') ? <M2 /> : legend && legend?.length > 15 ? `${legend?.slice(0, 21)}...` : legend }</Legend>
        </Box>
      </div>
  )
}

export default BoxInfos
