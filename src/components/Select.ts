import styled from 'styled-components'
import { device } from '../assets/styles/themes/devices'

export default styled.select`
  & + & {
    margin-top: 30px;
  }

  width: 100%;
  height: 40px;
  font-size: 12px;
  padding: 0px 15px;
  background: ${({ theme }) => theme.colors.grays.lighter};
  border: 2px solid ${({ theme }) => theme.colors.grays.lighter};
  border-radius: 4px;
  outline: none;
  text-align: center;
  color: ${({ theme }) => theme.colors.grays.light};

  &:focus,
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    transition: border-color 0.2s ease-in;
  }

  &:placeholder-shown {
    font-style: italic;
    color: ${({ theme }) => theme.colors.grays.light};
  }

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
`