import styled from 'styled-components'

interface PropStyle {
  $blue?: boolean
  $green?: boolean
  $yellow?: boolean
  $red?: boolean
  $orange?: boolean
}

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
export const Doc = styled.div<PropStyle>`
  & + & {
    margin-left: 20px
  }

  background: ${({ theme }) => theme.colors.white};
  max-width: 200px;
  min-width: 150px;
  height: 130px;
  padding: 10px;
  border-top: 7px solid ${({ theme, $blue, $green, $yellow, $orange }) => $blue ? theme.colors.blues.primary : $green ? theme.colors.greens.primary : $orange ? theme.colors.oranges.primary : $yellow ? theme.colors.alert.primary : theme.colors.grays.light};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1));

  p {
    font-size: 16px;
    font-weight: 600;
  }
`

export const Legend = styled.span`
  font-size: 10px;
  position: absolute;
  bottom: 10px;
`
