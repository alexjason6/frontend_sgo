import styled from 'styled-components'

export const Container = styled.section`
  width: 200px;
  margin-top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  p {
    color: ${({ theme }) => theme.colors.grays.light};
    text-align: center;
  }
`
