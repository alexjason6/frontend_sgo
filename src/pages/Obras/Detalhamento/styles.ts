import styled from 'styled-components'

interface PropStyle {
  $oneOfThree?: boolean
  $bars?: boolean
  $color?: string
  $width?: string
  $size?: number
  $fullWidth?: boolean
}

const getBarColor = (theme: any, props: PropStyle) => {
  const { $color } = props

  if ($color && theme.colors[$color]) {
    return theme.colors[$color].primary
  }

  return theme.colors.oranges.primary
}

const setWidht = (props: PropStyle) => {
  const { $width } = props

  if ($width) {
    return $width
  }
  return '100%'
}

export const Content = styled.section`
  width: calc(100% -50px);
  margin-left: 50px;
  padding: 0px 30px;
`

export const CardsInfos = styled.section<PropStyle>`
  width: 100%;
  margin-top: 30px;
  padding: 0px 30px;
  display: flex;
  flex-direction: ${({ $bars }) => $bars && 'column'};
  flex-wrap: wrap;
  gap: 20px;
`

export const Infos = styled.div<PropStyle>`
  max-width: ${({ $oneOfThree, $fullWidth }) => $oneOfThree ? '33%' : $fullWidth ? '100%' : '53%'};
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export const Title = styled.span`
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grays.primary};
`

export const Bar = styled.div<PropStyle>`
  width: ${({ ...props }) => setWidht(props)} !important;
  background: ${({ theme, ...props }) => getBarColor(theme, props)};
  padding: 5px 20px;
  color: ${({ theme, $size }) => $size! < 200 ? theme.colors.grays.primary : theme.colors.white};

  & + & {
    margin-top: -20px;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: -5px;
    margin-left: ${({ $size }) => ($size! < 200 && $size! > 50) ? `${$size! + 100}%` : $size! === 0 ? '50px' : 0};
  }

  .bargray {
    color: ${({ theme }) => theme.colors.grays.primary} !important;
  }
`

export const Var = styled.var<PropStyle>`
  font-size: 10px;
  margin-left: ${({ $size }) => ($size! < 200 && $size! > 50) ? `${$size! + 100}%` : $size! === 0 ? '50px' : 0};

  .bar {
    color: ${({ theme, $size }) => $size! < 200 ? theme.colors.grays.primary : theme.colors.white};
  }
`
