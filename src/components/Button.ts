import styled, { css } from 'styled-components'

interface PropStyle {
  $blue?: boolean
  $rdoRda?: boolean
  $green?: boolean
  $stroke?: boolean
  $alert?: boolean
  $danger?: boolean
}

const getBackgroundColor = (theme: any, props: PropStyle) => {
  if (props.$blue) return theme.colors.blues.primary
  if (props.$green) return theme.colors.greens.primary
  if (props.$alert) return theme.colors.alert.primary
  if (props.$danger) return theme.colors.danger.primary
  return theme.colors.oranges.primary
}

const getHoverColor = (theme: any, props: PropStyle) => {
  if (props.$blue) return theme.colors.blues.dark
  if (props.$green) return theme.colors.greens.dark
  if (props.$alert) return theme.colors.alert.dark
  if (props.$danger) return theme.colors.danger.dark
  return theme.colors.oranges.dark
}

const getActiveColor = (theme: any, props: PropStyle) => {
  if (props.$blue) return theme.colors.blues.darker
  if (props.$green) return theme.colors.greens.darker
  if (props.$alert) return theme.colors.alert.darker
  if (props.$danger) return theme.colors.danger.darker
  return theme.colors.oranges.darker
}

const getColor = (theme: any, $alert: boolean | undefined) => $alert ? theme.colors.grays.primary : theme.colors.white

export default styled.button<PropStyle>`
  height: 45px;
  font-size: 12px;
  padding: 0 30px;
  margin: 20px 0px;
  background: ${({ theme, ...props }) => getBackgroundColor(theme, props)};
  color: ${({ theme, $alert }) => getColor(theme, $alert)};
  font-weight: 500;
  border: none;
  border-radius: 4px;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme, ...props }) => getHoverColor(theme, props)};
    color: ${({ theme, $alert }) => $alert && theme.colors.white};
  }

  &:active {
    background: ${({ theme, ...props }) => getActiveColor(theme, props)};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.colors.grays.lighter};
      color: ${theme.colors.grays.light};
      cursor: not-allowed;

      &:hover {
        background: ${theme.colors.grays.lighter};
      }
    `}

  ${({ $stroke, $rdoRda, theme }) =>
    $rdoRda &&
    css`
    margin-top: ${$rdoRda && '-10px'};

      ${$stroke &&
      css`
        margin-top: 20px;
        background: transparent;
        color: ${theme.colors.grays.primary};
        border: 1px solid ${theme.colors.oranges.primary};

        &:hover {
          background: ${theme.colors.oranges.primary};
          color: ${theme.colors.white};
        }

        &:active {
          background: ${theme.colors.oranges.dark};
        }
      `}
    `}
`
