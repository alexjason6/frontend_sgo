import styled from "styled-components";
import { BsFiletypePdf, BsFiletypeXlsx } from "react-icons/bs";

export const Content = styled.section`
  width: calc(100% -50px);
  margin-left: 50px;
  padding: 0px 30px;
`;

export const Infos = styled.div`
  padding: 0px 30px 30px 30px;
`;

export const Pdf = styled(BsFiletypePdf)`
  color: ${({ theme }) => theme.colors.grays.light};
  font-size: 25px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.grays.primary};
    transition: all 0.3s ease-in;
  }
`;

export const Xlsx = styled(BsFiletypeXlsx)`
  color: ${({ theme }) => theme.colors.grays.light};
  font-size: 25px;
  margin-left: 5px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.grays.primary};
    transition: all 0.3s ease-in;
  }
`;
