import styled, { css } from 'styled-components'

interface PropStyle {
  $blue?: boolean
  $rdoRda?: boolean
  $stroke?: boolean
}

export default styled.button<PropStyle>`
  height: 45px;
  font-size: 12px;
  padding: 0 30px;
  margin: 20px 0px;
  background: ${({ theme, $blue }) => !$blue ? theme.colors.oranges.primary : theme.colors.blues.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  border: none;
  border-radius: 4px;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme, $blue }) => !$blue ? theme.colors.oranges.dark : theme.colors.blues.dark};
  }

  &:active {
    background: ${({ theme, $blue }) => !$blue ? theme.colors.oranges.darker : theme.colors.blues.darker};
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

  ${({ $stroke, $rdoRda, theme }) => $rdoRda && css`
      & + & {
        margin-top: -10px;
      }

      background: ${$stroke && 'transparent'};
      color: ${$stroke && theme.colors.grays.primary};
      border: ${$stroke && '1px solid'} ${theme.colors.oranges.primary};

      &:hover {
        background: ${$stroke && theme.colors.oranges.primary};
        color: ${$stroke && theme.colors.white};
      }

      &:active {
        background: ${$stroke && theme.colors.oranges.dark};
      }
  `}
`
