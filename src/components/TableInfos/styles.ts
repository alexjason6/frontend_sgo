import styled, { css } from "styled-components";

interface PropStyle {
  $index?: boolean;
  $inadimplente?: boolean;
  $inativo?: boolean;
  $clientes?: boolean;
  $open?: boolean;
  $total?: boolean;
  $large?: boolean;
  $medium?: boolean;
}

export const Table = styled.table`
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;

  tbody {
    width: 100%;
  }
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
`;

const widthStyles = css<PropStyle>`
  ${({ $large }) => $large && "width: 25%;"}
  ${({ $medium }) => $medium && "width: 15%;"}
`;

const colorStyles = css<PropStyle>`
  color: ${({ theme, $inadimplente, $inativo }) =>
    $inadimplente
      ? theme.colors.danger.primary
      : $inativo
      ? theme.colors.grays.lighter
      : theme.colors.grays.light};
`;

export const Th = styled.th<PropStyle>`
  height: ${({ $index }) => ($index ? "50px" : "40px")};
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.grays.lighter};
  color: ${({ theme }) => theme.colors.grays.light};
  position: sticky;

  ${({ $total, theme }) =>
    $total &&
    css`
      background: ${theme.colors.grays.primary};
      color: ${theme.colors.white};
      cursor: default;
      z-index: 1;
    `}

  ${widthStyles}
`;

export const Tr = styled.tr<PropStyle>`
  color: ${({ theme, $index }) =>
    !$index ? theme.colors.grays.primary : theme.colors.grays.light};

  &:nth-child(even) {
    background: ${({ theme, $open }) =>
      $open ? theme.colors.blues.primary : theme.colors.white};
    ${colorStyles}
  }

  &:nth-child(odd) {
    background: ${({ theme, $open }) =>
      $open ? theme.colors.blues.primary : theme.colors.grays.lighter};
    ${colorStyles}
  }

  ${({ $index, theme }) =>
    $index &&
    css`
      &:hover {
        background: ${theme.colors.grays.lighter};
      }
    `}

  &:hover {
    cursor: ${({ $index }) => (!$index ? "pointer" : "default")};
    background: ${({ theme, $index }) => !$index && theme.colors.blues.light};
    color: ${({ theme, $index }) => !$index && theme.colors.white};
  }
`;

export const Td = styled.td<PropStyle>`
  width: 8%;
  height: ${({ $index }) => ($index ? "50px" : "40px")};
  font-size: 11px;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;

  ${widthStyles}

  p {
    font-weight: 500;
    ${colorStyles}
  }
`;
