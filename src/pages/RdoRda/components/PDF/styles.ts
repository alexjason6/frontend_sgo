import styled, { css } from "styled-components";

interface PropStyle {
  $index?: boolean;
  $open?: boolean;
  $inativo?: boolean;
  $inadimplente?: boolean;
  $subitem?: boolean;
  $subitemIndex?: boolean;
  $large?: boolean;
  $medium?: boolean;
}

export const Container = styled.main`
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Header = styled.header`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grays.lighter};
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.oranges.light};
`;

export const Subtitle = styled.h4`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grays.light};
`;

export const Infos = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grays.light};
  margin-top: 10px;

  & + & {
    margin-top: 0px;
  }

  span {
    font-size: 0.9rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grays.light};
  }
`;

export const Content = styled.main`
  width: 100%;
`;

export const Item = styled.table<PropStyle>`
  width: 95%;
  font-size: 12px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;

  tbody {
    width: 100%;
  }
`;

export const Tr = styled.tr<PropStyle>`
  width: 95%;
  height: 35px;
  margin: 0 auto;
  display: table;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.grays.light};

  ${({ $index, theme }) =>
    $index &&
    css`
      background: ${theme.colors.grays.primary};
      color: ${theme.colors.white};
    `};

  ${({ $subitemIndex, theme }) =>
    $subitemIndex &&
    css`
      background: ${theme.colors.grays.lighter};
      color: ${theme.colors.grays.primary};
    `};

  ${({ $subitem, theme }) =>
    $subitem &&
    css`
      height: 25px;
      background: ${theme.colors.white};
      color: ${theme.colors.grays.primary};
      border-bottom: 1px solid #cccccc;
    `};
`;

export const Td = styled.td<PropStyle>`
  width: 5%;
  font-size: 0.6rem;
  font-weight: 300;
  text-align: center;
  padding: 0 10px;
  margin: 0;

  ${({ $index }) =>
    $index &&
    css`
      font-weight: 500;
    `}

  ${({ $large }) =>
    $large &&
    css`
      width: 25%;
    `}

    ${({ $medium }) =>
    $medium &&
    css`
      width: 10%;
    `}
`;
