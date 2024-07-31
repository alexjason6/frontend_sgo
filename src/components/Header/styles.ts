import styled from 'styled-components'

interface PropStyle {
  colorLine?: string
}

export const Container = styled.section`
  width: calc(100% - 50px);
  background: ${({ theme }) => theme.colors.white};
  padding: 50px 50px 10px 50px;
  margin-left: 50px;
`

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.grays.primary};
  margin-bottom: 10px;
`

export const Divisor = styled.hr<PropStyle>`
  width: 100%;
  border: none;
  margin-bottom: 20px;
  border-top: 3px solid
    ${({ theme, colorLine }) =>
      colorLine === 'gray'
        ? theme.colors.grays.light
        : theme.colors.oranges.primary};
`
