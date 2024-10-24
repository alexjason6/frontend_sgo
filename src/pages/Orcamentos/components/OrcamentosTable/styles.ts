import styled, { css } from "styled-components";
import { FiCopy, FiEdit, FiTrash } from "react-icons/fi";
import { BsFiletypePdf } from "react-icons/bs";

interface PropStyle {
  $index?: boolean;
  $inadimplente?: boolean;
  $inativo?: boolean;
  $clientes?: boolean;
  $open?: boolean;
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
  }
`;

export const Tr = styled.tr<PropStyle>`
  width: 95%;
  margin: 0 auto;
  display: table;
  color: ${({ theme, $index }) =>
    !$index ? theme.colors.grays.primary : theme.colors.grays.light};

  &:nth-child(even) {
    background: ${({ theme, $open }) =>
      $open ? theme.colors.blues.primary : theme.colors.white};
    color: ${({ theme, $index, $open }) =>
      !$index && $open && theme.colors.white};
  }

  &:nth-child(odd) {
    background: ${({ theme, $open }) =>
      $open ? theme.colors.blues.primary : theme.colors.grays.lighter};
    color: ${({ theme, $index, $open }) =>
      !$index && $open && theme.colors.white};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.blues.light};
    color: ${({ theme, $index }) => !$index && theme.colors.white};
  }

  ${({ $index, theme }) =>
    $index &&
    css`
      &:hover {
        background: ${theme.colors.grays.lighter};
        cursor: default;
      }
    `}
`;

export const Td = styled.td<PropStyle>`
  width: 11%;
  height: ${({ $index }) => ($index ? "50px" : "40px")};
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
  margin: 0;

  p {
    font-weight: 500;
    color: ${({ theme, $inadimplente, $inativo }) =>
      $inadimplente
        ? theme.colors.danger.primary
        : $inativo
        ? theme.colors.grays.lighter
        : theme.colors.grays.light};
  }
`;

export const Edit = styled(FiEdit)`
  color: ${({ theme }) => theme.colors.oranges.primary};
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Copy = styled(FiCopy)`
  color: ${({ theme }) => theme.colors.oranges.primary};
  font-size: 22px;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Pdf = styled(BsFiletypePdf)`
  color: ${({ theme }) => theme.colors.oranges.primary};
  font-size: 22px;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Delete = styled(FiTrash)`
  color: ${({ theme }) => theme.colors.danger.primary};
  font-size: 22px;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
