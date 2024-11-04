import styled, { css } from "styled-components";
import { FiX } from "react-icons/fi";

interface PropStyle {
  $confirmation?: boolean;
}

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding: 30px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  position: fixed;
  inset: 0;
  transition: visibility 800ms ease-in;
  z-index: 999997;
`;

export const Content = styled.section<PropStyle>`
  width: 100%;
  height: 100%;
  padding: 15px;
  background: ${({ theme, $confirmation }) =>
    !$confirmation ? theme.colors.white : "transparent"};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grays.primary};
  box-shadow: ${({ $confirmation }) =>
    !$confirmation &&
    `0 0px 36px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)`};
  overflow: auto;
`;

export const Close = styled.div`
  width: 30px;
  height: 30px;
  float: right;
`;

export const X = styled(FiX)<PropStyle>`
  font-size: 2rem;
  color: ${({ theme, $confirmation }) =>
    !$confirmation ? theme.colors.danger.primary : theme.colors.white};
  cursor: pointer;
`;
