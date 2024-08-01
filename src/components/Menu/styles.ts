import styled, { css } from 'styled-components'

interface PropStyles {
  $active?: boolean
}

export const Container = styled.nav`
  width: 50px;
  height: 100%;
  background: ${({ theme }) => theme.colors.oranges.primary};
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999999;
`

export const Item = styled.div<PropStyles>`
  width: 100%;
  height: 50px;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.oranges.light};
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme, $active }) => $active && css`
    background: ${theme.colors.blues.primary};
    color: ${theme.colors.white};
  `}
`
