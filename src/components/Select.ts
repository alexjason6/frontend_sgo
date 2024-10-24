import styled, { css } from "styled-components";
import { device } from "../assets/styles/themes/devices";
import arrowDown from "../assets/images/chevron-down.png";

interface PropStyles {
  $error?: boolean;
}

export default styled.select<PropStyles>`
  & + & {
    margin-top: 30px;
  }

  width: 100%;
  height: 40px;
  font-size: 12px;
  padding: 0px 20px 0px 15px;
  background: ${({ theme }) => theme.colors.grays.lighter};
  border: 2px solid ${({ theme }) => theme.colors.grays.lighter};
  border-radius: 4px;
  outline: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.light};
  -webkit-appearance: none;
  background: ${({ theme }) => theme.colors.grays.lighter} url(${arrowDown})
    no-repeat right center;
  background-size: 20px;

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.blues.primary};
    transition: border-color 0.2s ease-in;
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

  @media ${device.mobileL} {
    background: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white};
  }

  @media ${device.mobileM} {
    background: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white};
  }

  @media ${device.mobileS} {
    background: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background: ${theme.colors.white};
      border: none;
      border-radius: 0;
      border-bottom: 2px solid ${theme.colors.oranges.primary};

      &:hover {
        border: none;
        border-bottom: 2px solid ${theme.colors.oranges.primary};
      }
    `}
`;
