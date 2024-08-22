import styled from 'styled-components'
import { FiX } from 'react-icons/fi'

export const Container = styled.main`
  width: 100%;
  height: 100%;
  padding: 30px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  position: fixed;
  inset: 0;
  transition: visibility 800ms ease-in;
  z-index: 9999999999999;
`

export const Content = styled.section`
  width: 100%;
  height: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.grays.primary};
  box-shadow: 0 0px 36px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: auto;
`

export const Close = styled.div`
  width: 30px;
  height: 30px;
  float: right;
`

export const X = styled(FiX)`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.danger.primary};
  cursor: pointer;
`
