import styled, { css } from 'styled-components'

interface PropStyles {
  visible?: boolean
  active?: boolean
}

export const Container = styled.div<PropStyles>`
  width: 200px;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999997;
  transform: translateX(-270px);
  transition: all 0.3s ease-in-out;

  ${({ visible }) => visible && css`
    transform: translateX(0px);
    transition: all 0.3s ease-in-out;
  `};
`

export const Item = styled.div<PropStyles>`
  width: 100%;
  height: 50px;
  margin: 0px;
  padding-left: 15px;
  color: ${({ theme }) => theme.colors.oranges.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  p {
      font-size: 12px;
      margin-left: 20px;
      color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.grays.primary)};
    }

    span {
      font-size: 16px;
      font-weight: 600;
      margin-left: 20px;
      color: ${({ theme }) => theme.colors.oranges.primary};
    }

  &:hover {
    background: ${({ theme }) => theme.colors.oranges.primary};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.2s;

    p, span {
      color: ${({ theme }) => theme.colors.white};
      transition: all 0.2s;
    }
  };

  ${({ theme, active }) => active && css`
    background: ${theme.colors.blues.primary};
    color: ${theme.colors.white};
    transition: all 0.2s;
  `};
`

export const LogoCliente = styled.img`
  width: 100px;
  height: auto;
  align-self: center;
  margin-top: auto;
  margin-bottom: 20px;
`
