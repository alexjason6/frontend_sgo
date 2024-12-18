import { FiArrowDown } from "react-icons/fi";
import styled, { css } from "styled-components";

interface PropStyle {
  $data?: boolean;
  $direction?: boolean;
}

export const Content = styled.section<PropStyle>`
  width: calc(100% - 50px);
  height: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: ${({ $data }) => (!$data ? "center" : "flex-start")};
`;

export const Itens = styled.div`
  width: 100%;
`;

export const ContentPage = styled.div`
  width: 100%;
  display: grid;
`;

export const ButtonContainer = styled.div`
  margin: 0 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`;

export const Sort = styled.p`
  margin-right: 50px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-content: center;
  gap: 5px;
`;

export const Arrow = styled(FiArrowDown)<PropStyle>`
  color: ${({ theme }) => theme.colors.oranges.primary};
  font-size: 15px;
  transition: all 300ms ease-in;

  ${({ $direction }) =>
    $direction &&
    css`
      transform: rotate(-180deg);
      transition: all 300ms ease-in;
    `}
`;
