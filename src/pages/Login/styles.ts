import styled from 'styled-components'
import { device } from '../../assets/styles/themes/devices'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;

  @media ${device.mobileL} {
    flex-direction: column;
  }

  @media ${device.mobileM} {
    flex-direction: column;
  }

  @media ${device.mobileS} {
    flex-direction: column;
  }
`

export const SgoContainer = styled.section`
  width: 40%;
  min-width: 300px;
  max-width: 600px;
  height: 100%;
  background: ${({ theme }) => theme.colors.grays.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media ${device.mobileL} {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 30%;
    flex-direction: row;
  }

  @media ${device.mobileM} {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 30%;
    flex-direction: row;
  }

  @media ${device.mobileS} {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: 30%;
    flex-direction: row;
  }
`

export const Name = styled.h1`
  width: 180px;
  font-size: 20px;
  margin-top: 20px;
  font-weight: 200;
  line-height: 25px;
  color: ${({ theme }) => theme.colors.white};

  @media ${device.mobileL} {
    width: 35%;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 20px;
  }

  @media ${device.mobileM} {
    width: 35%;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 20px;
  }

  @media ${device.mobileS} {
    width: 35%;
    font-size: 16px;
    margin-top: 0px;
    margin-left: 20px;
  }
`

export const Logo = styled.img`
  width: 100%;
  max-width: 180px;
  margin: 20px 0px;

  @media ${device.mobileL} {
    max-width: 100px;
  }

  @media ${device.mobileM} {
    max-width: 100px;
  }

  @media ${device.mobileS} {
    max-width: 100px;;
  }
`

export const FormContainer = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${device.mobileL} {
    max-width: 300px !important;
    padding-bottom: 30px;
  }

  @media ${device.mobileM} {
    max-width: 300px !important;
    padding-bottom: 30px;
  }
  @media ${device.mobileS} {
    max-width: 300px !important;
    padding-bottom: 30px;
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  filter: drop-shadow(1px 1px 15px rgba(0, 0, 0, 0.3));
  border-radius: 8px;

  @media ${device.mobileL} {
    margin-top: 30px;
    padding: 30px;
  }

  @media ${device.mobileM} {
    margin-top: 30px;
    padding: 30px;
  }

  @media ${device.mobileS} {
    margin-top: 30px;
    padding: 30px;
  }
`

export const Text = styled.p`
  width: 100%;
  margin-bottom: 50px;
  font-size: 22px;
  line-height: 22px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.grays.light};

  @media ${device.mobileL} {
    font-size: 14px;
    margin-bottom: 40px;
  }

  @media ${device.mobileM} {
    font-size: 14px;
    margin-bottom: 40px;
  }

  @media ${device.mobileS} {
    font-size: 14px;
    margin-bottom: 40px;
  }
`

export const Legend = styled.legend`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grays.light};
  margin-left: 5px;
  margin-bottom: 3px;

  @media ${device.mobileL} {
    text-align: center;
  }

  @media ${device.mobileM} {
    text-align: center;
  }

  @media ${device.mobileS} {
    text-align: center;
  }
`

export const Cliente = styled.div`
  width: 100%;
  height: 50px;
  bottom: 10px;
  right: 20px;

  @media ${device.mobileL} {
    margin-top: 20px;
  }

  @media ${device.mobileM} {
    margin-top: 20px;
  }

  @media ${device.mobileS} {
    margin-top: 20px;
  }
`

export const LogoCliente = styled.img`
  width: 70px;
  float: right;
`
