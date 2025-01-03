import styled, { css } from "styled-components";

interface PropStyles {
  $error?: boolean;
  $listData?: boolean;
  $square?: boolean;
  $dateFilter?: boolean;
}

export default styled.input<PropStyles>`
  & + & {
    margin-top: 30px;
  }

  width: 100%;
  min-width: 200px;
  height: 40px;
  font-size: 12px;
  padding: 0 15px;
  background: ${({ theme }) => theme.colors.grays.lighter};
  border: 2px solid ${({ theme }) => theme.colors.grays.lighter};
  border-radius: 4px;
  outline: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.light};
  transition: border-color 0.2s ease-in;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.blues.light};
  }

  &:placeholder-shown {
    font-style: italic;
    color: ${({ theme }) => theme.colors.grays.light};
  }

  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.colors.danger.primary};
    `}

  ${({ $listData, theme }) =>
    $listData &&
    css`
      background: ${theme.colors.white};
      color: ${theme.colors.grays.primary};
      border: none;
      border-radius: 0;
      border-bottom: 2px solid ${theme.colors.oranges.primary};

      &:hover {
        border-color: ${theme.colors.oranges.primary};
      }
    `}

  ${({ $square }) =>
    $square &&
    css`
      width: 80px !important;
      min-width: 70px;
    `}

  ${({ $dateFilter }) =>
    $dateFilter &&
    css`
      width: 130px !important;
      min-width: 70px;
    `}
`;
