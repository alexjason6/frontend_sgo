import styled, { css } from "styled-components";
import { device } from "../../../../assets/styles/themes/devices";

interface PropStyle {
  $fullwidth?: boolean;
  $items?: boolean;
  $total?: boolean;
}

const formContainerMobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS} {
    max-width: 300px !important;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const formContainerTablesStyles = css`
  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Content = styled.section<PropStyle>`
  width: ${({ $fullwidth }) => (!$fullwidth ? "calc(100% - 50px)" : "100%")};
  margin-left: ${({ $fullwidth }) => !$fullwidth && "50px"};
`;

export const Form = styled.form`
  width: 100%;
  display: grid;
  flex-wrap: wrap;
  gap: 10px;
  ${formContainerMobileStyles}
  ${formContainerTablesStyles}
`;

export const FormContent = styled.section<PropStyle>`
  margin: 0px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  ${({ $items, theme }) =>
    $items &&
    css`
      padding: 0;
      border-bottom: 1px solid ${theme.colors.grays.lighter};
    `}

  ${({ $total }) =>
    $total &&
    css`
      justify-content: flex-end;
    `}

  p {
    text-align: left;
  }
`;

export const ButtonContainer = styled.div`
  width: calc(100% - 60px);
  margin: 0 auto;
  text-align: right;
`;

export const AddItem = styled.span`
  width: 100%;
  text-align: right;
  padding: 0px 30px;

  p {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
`;

export const Divisor = styled.hr`
  width: 100%;
  height: 0px;
  margin-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.grays.lighter} !important;
`;
