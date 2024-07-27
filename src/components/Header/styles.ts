import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: 50px;
`

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.grays.primary};
  margin-bottom: 10px;
`

export const Divisor = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid ${({ theme }) => theme.colors.oranges.primary};
`
