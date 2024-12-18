import styled, { css } from 'styled-components'
import { device } from '../../../../assets/styles/themes/devices'

const mobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS} {
    flex-direction: column;
  }
`

const formContainerMobileStyles = css`
  @media ${device.mobileL}, ${device.mobileM}, ${device.mobileS}  {
    max-width: 300px !important;
    grid-template-columns: repeat(1, 1fr);
  }
`

const formContainerTablesStyles = css`
  @media ${device.tablet}  {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  flex-direction: column;

  ${mobileStyles}
`

export const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding: 10px 10px 10px 40px;

  ${formContainerMobileStyles}
  ${formContainerTablesStyles}
`

export const ButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`
