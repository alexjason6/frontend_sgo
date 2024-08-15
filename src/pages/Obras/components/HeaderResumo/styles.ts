import styled from 'styled-components'

export const Content = styled.section`
  margin: 0px 50px 20px 50px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;

  .containerButtons {
    width: 100%;
  }

 .containerButtons > button {
    float: right;
  }
`

export const Name = styled.h4`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grays.light};
  display: inline-flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    margin-left: 5px;
    font-weight: normal;
  }
`

export const DadosContainer = styled.div`
  width: fit-content;
  margin-right: 10%;
  max-width: 400px;
  display: grid;
  gap: 20px;
`

export const Dados = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.grays.primary};

  span {
    font-size: 10px;
    font-weight: normal;
  }
`
