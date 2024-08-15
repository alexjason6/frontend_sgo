import styled from 'styled-components'

interface PropStyle {
  $color?: string
  $opacity?: number
  $legend?: boolean
  $accent?: string
}

const getLineColor = (theme: any, props: PropStyle) => {
  const { $color, $accent } = props

  if ($color && theme.colors[$color]) {
    if ($color !== 'grays' && !$accent) {
      return theme.colors[$color].primary
    }

    if ($color !== 'grays' && $accent) {
      return theme.colors[$color][$accent]
    }

    return theme.colors.grays.light
  }

  return theme.colors.oranges.primary
}

export const BorderTop = styled.div<PropStyle>`
  max-width: 200px;
  min-width: 150px;
  height: 7px;
  background: ${({ theme, ...props }) => getLineColor(theme, props)};
  opacity: ${({ $opacity }) => $opacity ?? 1};
`

export const Box = styled.div<PropStyle>`
  & + & {
    margin-left: 20px
  }

  background: ${({ theme }) => theme.colors.white};
  max-width: 200px;
  min-width: 150px;
  height: 130px;
  padding: 10px;
  display: flex;
  justify-content: ${({ $legend }) => $legend ? 'flex-end' : 'center'};
  align-items: center;
  flex-direction: column;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));

  p {
    height: ${({ $legend }) => $legend ? '55px' : 'auto'};
    font-size: 16px;
    font-weight: 600;
  }
`

export const Legend = styled.var`
  font-size: 10px !important;
  color: ${({ theme }) => theme.colors.grays.light}
`
