import styled, { css } from 'styled-components'

interface PropStyles {
  error?: any
}

export default styled.input<PropStyles>`
  & + & {
    margin-top: 30px;
  }

  width: 100%;
  height: 40px;
  font-size: 12px;
  padding: 0px 15px;
  background: ${({ theme }) => theme.colors.grays.lighter};
  border: 2px solid ${({ theme }) => theme.colors.grays.lighter};
  border-radius: 4px;
  outline: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.light};

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.blues.light};
    transition: border-color 0.2s ease-in;
  }

  &:placeholder-shown {
    font-style: italic;
    color: ${({ theme }) => theme.colors.grays.light};
  }

  ${({ error, theme }) =>
    error &&
    css`
      border-width: 2px;
      border-color: ${theme.colors.danger.primary};
    `};
`
