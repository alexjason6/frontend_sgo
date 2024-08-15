import styled, { css } from 'styled-components'

interface PropStyle {
  $index?: boolean
  $inadimplente?: boolean
  $inativo?: boolean
  $clientes?: boolean
  $open?: boolean
}

export const Table = styled.table`
  width: 95%;
  font-size: 12px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;

  tbody {
    width: 100%;
    padding-bottom: 40px;
  };
`

export const Tr = styled.tr<PropStyle>`
    width: 95%;
    margin: 0 auto;
    display: table;
    cursor: pointer;
    color: ${({ theme, $index }) => !$index ? theme.colors.grays.primary : theme.colors.grays.light};

    &:nth-child(even) {
    background: ${({ theme, $open }) => $open ? theme.colors.blues.primary : theme.colors.white};
    color: ${({ theme, $index, $open }) => (!$index && $open) && theme.colors.white};
  }

  &:nth-child(odd) {
    background: ${({ theme, $open }) => $open ? theme.colors.blues.primary : theme.colors.grays.lighter};
    color: ${({ theme, $index, $open }) => (!$index && $open) && theme.colors.white};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blues.light};
    color: ${({ theme, $index }) => !$index && theme.colors.white};
  }

  ${({ $index, theme }) => $index && css`
    &:hover {
      background: ${theme.colors.grays.lighter};
      cursor: default;
    }
  `}
`

export const Th = styled.th<PropStyle>`
  width: 11%;
  height: ${({ $index }) => $index ? '50px' : '40px'};
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
  margin: 0;

  p {
    font-weight: 500;
    color: ${({ theme, $inadimplente, $inativo }) => ($inadimplente ? theme.colors.danger.primary : $inativo ? theme.colors.grays.lighter : theme.colors.grays.light)};
  }
`

export const Td = styled.td<PropStyle>`
  width: 11%;
  height: ${({ $index }) => $index ? '50px' : '40px'};
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
  margin: 0;

  p {
    font-weight: 500;
    color: ${({ theme, $inadimplente, $inativo }) => ($inadimplente ? theme.colors.danger.primary : $inativo ? theme.colors.grays.lighter : theme.colors.grays.light)};
  }
`
