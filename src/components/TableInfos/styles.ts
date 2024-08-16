import styled, { css } from 'styled-components'

interface PropStyle {
  $index?: boolean
  $inadimplente?: boolean
  $inativo?: boolean
  $clientes?: boolean
  $open?: boolean
  $total?: boolean
  $large?: boolean
  $medium?: boolean
}

export const Table = styled.table`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  border: none;

  tbody {
    width: 100%;
  };
`

export const Tr = styled.tr<PropStyle>`
    width: 100%;
    margin: 0 auto;
    color: ${({ theme, $index }) => !$index ? theme.colors.grays.primary : theme.colors.grays.light};

    &:nth-child(even) {
      background: ${({ theme, $open }) => $open ? theme.colors.blues.primary : theme.colors.white};
      color: ${({ theme, $index, $open }) => (!$index && $open) && theme.colors.white};
    }

    &:nth-child(odd) {
      background: ${({ theme, $open }) => $open ? theme.colors.blues.primary : theme.colors.grays.lighter};
      color: ${({ theme, $index, $open }) => (!$index && $open) && theme.colors.white};
    }

    ${({ $index, theme }) => $index && css`
      &:hover {
        background: ${theme.colors.grays.lighter};
      }
  `}


  ${({ $large }) => $large && css`
    width: 20%;
  `}

  ${({ $medium }) => $medium && css`
    width: 15%;
  `}

  ${({ $total, theme }) => $total && css`
    background: ${theme.colors.grays.primary} !important;
    color: ${theme.colors.white};
    cursor: default;
  `}
`

export const Td = styled.td<PropStyle>`
  width: 8%;
  height: ${({ $index }) => $index ? '50px' : '40px'};
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
  margin: 0;

  ${({ $large }) => $large && css`
    width: 20%;
  `}

  ${({ $medium }) => $medium && css`
    width: 15%;
  `}

  p {
    font-weight: 500;
    color: ${({ theme, $inadimplente, $inativo }) => ($inadimplente ? theme.colors.danger.primary : $inativo ? theme.colors.grays.lighter : theme.colors.grays.light)};
  }
`
