import styled, { css } from "styled-components";

interface PropStyle {
  $title?: boolean;
  $valor?: boolean;
  $executado?: boolean;
  $comprometido?: boolean;
  $saldo?: boolean;
}

export const Container = styled.div`
  width: 16.1%;
  min-width: 250px;
  padding: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.05));
  border: 1px solid ${({ theme }) => theme.colors.grays.lighter};

  .card {
    cursor: pointer;
  }
`;

export const Title = styled.h4`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grays.light};
  text-transform: uppercase;
`;

export const Hr = styled.hr<PropStyle>`
  border: none;
  border-top: 1px solid
    ${({ theme, $title }) =>
      $title ? theme.colors.grays.lighter : theme.colors.blues.lighter};
  margin-top: ${({ $title }) => ($title ? "10px" : "0px")};
`;
export const Item = styled.span`
  font-size: 0.6rem;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.grays.light};
`;

export const Value = styled.p<PropStyle>`
  font-size: 0.9rem;
  font-weight: 600;

  ${({ $valor, $executado, $comprometido, $saldo, theme }) =>
    ($valor ?? $executado ?? $comprometido ?? $saldo) &&
    css`
      color: ${$valor
        ? theme.colors.blues.primary
        : $executado
        ? theme.colors.oranges.primary
        : $comprometido
        ? theme.colors.danger.primary
        : theme.colors.greens.primary};
    `}
`;

export const Cliente = styled.var`
  width: 100%;
  font-size: 10px;
  margin-top: 20px;
  text-align: right;
  color: ${({ theme }) => theme.colors.grays.lightHalf};
  float: right;
`;
