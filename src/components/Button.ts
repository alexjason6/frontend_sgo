import styled, { css } from 'styled-components'

export default styled.button`
  height: 45px;
  font-size: 12px;
  padding: 0 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.oranges.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  border: none;
  border-radius: 4px;
  transition: background 0.4s;

  &:hover {
    background: ${({ theme }) => theme.colors.oranges.dark};
  }

  &:active {
    background: ${({ theme }) => theme.colors.oranges.darker};
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
`
