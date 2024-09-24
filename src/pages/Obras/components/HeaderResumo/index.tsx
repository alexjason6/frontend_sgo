import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import ModalContext from '../../../../contexts/modalContext'

import Button from '../../../../components/Button'

import cpfCnpjFormat from '../../../../utils/cpfCnpjFormat'
import dateFormat from '../../../../utils/dateFormat'

import { Content, Dados, DadosContainer, Name } from './styles'

import { type TypeHeaderResumoObra } from '../../../../interfaces/globalInterfaces'
import OrcamentosContext from '../../../../contexts/orcamentosContext'

const HeaderResumoObra: React.FC<TypeHeaderResumoObra> = ({ obra, detalhamento, cliente }) => {
  const navigate = useNavigate()
  const { changeModal } = useContext(ModalContext)
  const { modelos } = useContext(OrcamentosContext)
  const [modeloOrcamento] = modelos.filter((modelo) => modelo.id === obra.tipo)

  const handleOpenDetalhamento = (clienteId: number) => {
    navigate(`/obras/detalhamento/${obra.id}`, {
      state: {
        clienteId,
        cliente
      }
    })
    changeModal()
  }

  return (
    <Content>
    <Name>{obra.nome}<p> - {modeloOrcamento?.nome}</p></Name>
    <DadosContainer>
      <Dados>
        <span>Cliente:</span>
        <br />
        {cliente.razao_social}
      </Dados>
      <Dados>
        <span>CPF/CNPJ:</span>
        <br />
        {cpfCnpjFormat(cliente.cpf_cnpj)}
      </Dados>
      <Dados>
        <span>Alvará:</span>
        <br />
        {obra.alvara}
      </Dados>
    </DadosContainer>

    <DadosContainer>
      <Dados>
        <span>Endereço:</span>
        <br />
        {obra.logradouro}, {obra.numero}{obra.complemento ? ' - ' + obra.complemento : ' - '} {obra.bairro}, {obra.cidade}/{obra.uf}
      </Dados>
      <Dados>
        <span>Responsável:</span>
        <br />
        {cliente.responsavel}
      </Dados>
      <Dados>
        <span>Engenheiro responsável:</span>
        <br />
        {obra.engenheiro}
      </Dados>
    </DadosContainer>

    <DadosContainer>
      <Dados>
        <span>Início da obra:</span>
        <br />
        {dateFormat(obra.data_inicio, false)}
      </Dados>
      <Dados>
        <span>Previsão de entrega:</span>
        <br />
        {dateFormat(obra.previsao_entrega, false)}
      </Dados>
      <Dados>
        <span>Metragem total projeto:</span>
        <br />
        {new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 3 }).format(Number(obra.metragem))}m<sup>2</sup>
      </Dados>
    </DadosContainer>
    {detalhamento && <Button $blue onClick={() => handleOpenDetalhamento(cliente.id!)}>Abrir detalhamento</Button>}
  </Content>
  )
}

export default HeaderResumoObra
