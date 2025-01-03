import styled, { css } from "styled-components";

interface PropStyles {
  $active?: boolean;
  $open?: boolean;
  $menu?: boolean;
}

export const Container = styled.nav<PropStyles>`
  width: 50px;
  height: 100%;
  background: ${({ theme }) => theme.colors.oranges.primary};
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999996;
  transition: background 0.4s, color 0.2s, width 0.2s;

  ${({ $open }) =>
    $open &&
    css`
      width: 200px;
      background: ${({ theme }) => theme.colors.white};
      filter: drop-shadow(1px 1px 15px rgba(0, 0, 0, 0.3));
    `}
`;

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

  ${({ theme, $open }) =>
    $open &&
    css`
      padding-left: 20px;
      color: ${theme.colors.oranges.primary};
      justify-content: flex-start !important;
    `}

  ${({ $menu, theme, $open }) =>
    $menu &&
    css`
      background: ${$open && theme.colors.grays.primary};
    `}

  p {
    font-size: 12px;
    margin-left: 20px;
    color: ${({ theme, $active }) =>
      $active ? theme.colors.white : theme.colors.grays.primary};
  }

  span {
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.oranges.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.oranges.light};
    color: ${({ theme }) => theme.colors.white};

    p,
    span {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ theme, $active }) =>
    $active &&
    css`
      background: ${theme.colors.blues.primary};
      color: ${theme.colors.white};
    `}
`;

export const LogoCliente = styled.img`
  width: 100px;
  height: auto;
  align-self: center;
  margin: auto 0 20px;
`;
