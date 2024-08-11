import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContainer } from '../../../assets/styles/global'
import { clientesDb } from '../../../assets/database/clientes'
import { tipoOrcamentoDb } from '../../../assets/database/tipoOrcamento'

import Header from '../../../components/Header'
import Button from '../../../components/Button'

import cpfCnpjFormat from '../../../utils/cpfCnpjFormat'
import dateFormat from '../../../utils/dateFormat'
import checkStatus from '../../../utils/checkStatus'

import { Content, Dados, DadosContainer, Name, Doc, Legend } from './styles'

import { type Obra } from '../../../interfaces/globalInterfaces'
import ModalContext from '../../../contexts/modalContext'

interface TypeObra {
  obra: Obra
  saldo: number
  orcamento: number
  executado: number
  comprometido: number
}

const ResumoObra: React.FC<TypeObra> = ({ saldo, orcamento, executado, comprometido, obra }) => {
  const navigate = useNavigate()
  const { changeModal } = useContext(ModalContext)
  const [cliente] = clientesDb.filter((cliente) => cliente.id === obra.id_cliente)
  const modeloOrcamento = tipoOrcamentoDb.find((modelo) => modelo.id === obra.tipo)
  const metragem = orcamento / obra.metragem!
  const perCentExecutado = ((executado / orcamento) * 100).toFixed(2)
  const perCentComprometido = ((comprometido / orcamento) * 100).toFixed(2)
  const perCentSaldo = ((saldo / orcamento) * 100).toFixed(2)

  const handleOpenDetalhamento = () => {
    navigate(`/obras/detalhamento/id=${obra.id}`)
    changeModal()
  }

  return (
    <GlobalContainer $modal>
      <Header title='Resumo de obra' modal/>
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
            {obra.logradouro}, {obra.numero}{obra.complemento ? ' - ' + obra.complemento : ' - '}{obra.bairro}, {obra.cidade}/{obra.uf}
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
        <Button $blue onClick={handleOpenDetalhamento}>Abrir detalhamento</Button>
      </Content>

      <Header title='Documentos' modal subHeader/>
      <Content>
        <Doc><p>RDO</p></Doc>
        <Doc><p>RDA</p></Doc>
        <Doc $blue><p>Relatórios</p></Doc>
      </Content>

      <Header title='Informações de orçamento' modal subHeader/>
      <Content>
        <Doc $blue><p>{checkStatus(obra.status, 'orçamento')}</p></Doc>
        <Doc $blue><p>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(orcamento)}</p></Doc>
        <Doc $green><p>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(saldo)}</p></Doc>
        <div className='containerButtons'>
          <Button $blue>Ver mais</Button>
        </div>
      </Content>

      <Header title='Acompanhamento econômico' modal subHeader/>
      <Content>
        <Doc $blue>
          <p>{Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(metragem)}</p>
          <Legend>valor m<sup>2</sup></Legend>
        </Doc>
        <Doc $blue>
          <p>{Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(orcamento)}</p>
          <Legend>orçamento</Legend>
        </Doc>
        <Doc $yellow>
          <p>{Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(executado)}</p>
          <Legend>valro executado</Legend>
        </Doc>
        <Doc $orange>
          <p>{Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(comprometido)}</p>
          <Legend>comprometido</Legend>
        </Doc>
        <Doc $green>
          <p>{Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(saldo)}</p>
          <Legend>saldo</Legend>
        </Doc>
        <Doc $yellow>
          <p>{Intl.NumberFormat('pt-BR').format(Number(perCentExecutado))}%</p>
          <Legend>% executado</Legend>
        </Doc>
        <Doc $orange>
          <p>{Intl.NumberFormat('pt-BR').format(Number(perCentComprometido))}%</p>
          <Legend>% comprometido</Legend>
        </Doc>
        <Doc $green>
          <p>{Intl.NumberFormat('pt-BR').format(Number(perCentSaldo))}%</p>
          <Legend>% saldo disponível</Legend>
        </Doc>
        <div className='containerButtons' style={{ marginBottom: 20 }}>
          <Button $blue>Ver mais</Button>
        </div>
      </Content>
    </GlobalContainer>
  )
}

export default ResumoObra
