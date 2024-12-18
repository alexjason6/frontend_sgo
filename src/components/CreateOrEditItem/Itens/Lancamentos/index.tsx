import React from "react";

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import Header from '../../../../components/Header'
import Menu from '../../../../components/Menu'
import FormGroup from '../../../../components/FormGroup'
import Input from '../../../../components/Input'
import Select from '../../../../components/Select'
import Button from '../../../../components/Button'
import ToggleSwitch from '../../../../components/ToggleSwitch'

import useLancamentos from "./useLancamentos";
import useItems from "./useItems";

import { AddItem, ButtonContainer, Content, Divisor, Form, FormContent } from './styles'

import { TypeNewLancamento } from "../../../../interfaces/globalInterfaces";
import { FiPlus, FiX } from "react-icons/fi";
import { onlyNumberFormat } from "../../../../utils/onlyNumbersFormat";

const Lancamentos: React.FC<TypeNewLancamento> = ({ tipo, rdoRda, nameCliente, obraId, cliente_id }) => {
  const {
    cliente,
    typeDocument,
    fornecedor,
    orcamentoSelected,
    fornecedores,
    contratoExists,
    contrato,
    lancamentosRdo,
    dataLancamento,
    dataNf,
    nf,
    observacao,
    valorComprometido,
    setNf,
    setValorComprometido,
    handleChangeFornecedor,
    setContratoExists,
    setContrato,
    setDataLancamento,
    setDataNf,
    setObservacao,
    dateFormat,
    currencyFormat,
    handleSubmitLancamento,
  } = useLancamentos({tipo, rdoRda, nameCliente, obraId, cliente_id })
  const {
    itens,
    valorTotal,
    parcelamento,
    diasVencimento,
    dataVencimento,
    numeroParcelas,
    parcelas,
    handleChangeDataVencimento,
    handleChangeParcelamento,
    handleNumeroParcelasChange,
    setDataVencimento,
    setItens,
    handleChangeItemAndParcelaPrice,
    setParcelas,
    handleRemoveItem,
    handleAddItem,
  } = useItems()

  return (
    <GlobalContainer $modal>
      <Menu />
      <Header title={`Lançamento em ${typeDocument}`} cliente={cliente ?? nameCliente} goBack />
      <Content>
        <Form>
          <FormContent>
            <FormGroup oneOfFour>
              <Legend>Cliente:</Legend>
              <Input value={cliente ?? cliente.nome} readOnly />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Fornecedor:</Legend>
              <Select value={fornecedor} onChange={(e) => handleChangeFornecedor(e.target.value)}>
                <option value=''>Selecione um fornecedor</option>
                <option value="0">Cadastrar novo fornecedor</option>
                <option disabled>________________________________</option>
                {fornecedores.map((item) => (
                  <option key={item.id} value={item.id}>{item.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>É contrato?</Legend>
              <Select value={contratoExists} onChange={(event) => setContratoExists(Number((event.target as HTMLSelectElement).value))}>
                <option value={1}>Sim</option>
                <option value={0}>Não</option>
              </Select>
            </FormGroup>

            {contratoExists === 1 && <FormGroup oneOfFive>
              <Legend >Abater do contrato:</Legend>
              <Select value={contrato} onChange={(event) => setContrato(Number((event.target as HTMLSelectElement).value))}>
                <option  value=''>Selecione o contrato</option>
                <option>Novo contrato</option>
                <option disabled>________________________________</option>
                {lancamentosRdo.filter((lancamentoFilter) => lancamentoFilter.valor_comprometido).map((lancamento) => {
                  const fornecedor = fornecedores.find((item) => item.id === lancamento.fornecedor)
                  return (
                  <option value={lancamento.id} key={lancamento.id}>Contrato NF: {lancamento.nf} - {dateFormat(lancamento.data_lancamento)} - {fornecedor?.nome} - {currencyFormat(String(lancamento.valor_comprometido))}</option>
                )})}
              </Select>
            </FormGroup>}

            <FormGroup oneOfFive>
              <Legend>Data lançamento:</Legend>
              <Input type='date' value={dataLancamento} onChange={(event) => setDataLancamento(event?.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Nº da NF:</Legend>
              <Input type='textl' placeholder='Ex.: 123456' value={nf} onChange={(event) => setNf(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Data emissão NF:</Legend>
              <Input type='date' value={dataNf} onChange={(event) => setDataNf(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Descrição:</Legend>
              <Input type='text' value={observacao} onChange={(event) => setObservacao(event.target.value)} placeholder='Ex.: Pagamento medição.' />
            </FormGroup>
          </FormContent>

          <Header title='Itens do lançamento' subHeader fullwidth />
          {itens.map((groupItem) => {
            const [valueInfos] = itens.filter((item) => item.id === groupItem.id)
            const value = valueInfos.valor
            const etapaSelected = groupItem.etapa
            const subetapaFiltered = orcamentoSelected?.subitem.filter((item: { etapa: number; }) => item.etapa === Number(etapaSelected))

            return (
              <FormContent key={groupItem.id} $items>
                <FormGroup oneOfFive>
                  <Legend>Etapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'etapa', e.target.value, setItens)}>
                    <option value="">Selecione uma etapa</option>
                    <option value='0'>Cadastrar nova etapa</option>
                    <option disabled>________________________________</option>
                    {orcamentoSelected?.item.filter((item) => item.nome !== '').map((etapa, index) => {
                      return (
                      <option key={index} value={etapa.numero}>{etapa.nome}</option>
                    )})}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Subetapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'subetapa', e.target.value, setItens)}>
                    <option value="">Selecione uma subetapa</option>
                    <option value='0'>Cadastrar nova subetapa</option>
                    <option disabled>________________________________</option>
                    {subetapaFiltered
                        ?.filter((item, index) =>
                          index === subetapaFiltered.findIndex((t) => t.id === item.id)
                        )
                        .map((subetapa, index) => (
                          <option key={index} value={subetapa.id}>{subetapa.nome}</option>
                        ))}
                  </Select>
                </FormGroup>

                <FormGroup oneOfFour>
                  <Legend>Descrição:</Legend>
                  <Input type='text' placeholder='Digite a descrição do lançamento' onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'descricaoEtapa', e.target.value, setItens)} />
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Valor:</Legend>
                  <Input type='text' value={currencyFormat(value)} placeholder='Ex.: R$5.022,53' onChange={(e) => handleChangeItemAndParcelaPrice(groupItem.id, 'valor', e.target.value, setItens)} />
                </FormGroup>
              <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveItem(groupItem.id)}><FiX color='red' size={23} /></p>
            </FormContent>
            )
          })}
          <AddItem>
            <p onClick={handleAddItem}>Adicionar item <FiPlus color='green' size={23} /></p>
          </AddItem>

          <FormContent $total>
            <Divisor />
            {!contratoExists
              ? (
              <FormGroup oneOfFive>
                <Legend>Valor total {itens.length > 1 ? 'dos itens' : 'do item'}:</Legend>
                <Input placeholder='Valor total itens'
                  value={Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(valorTotal)} readOnly />
              </FormGroup>
                )
              : (
              <FormGroup oneOfFive>
              <Legend>Valor comprometido:</Legend>
              <Input placeholder='Valor total itens'
                value={Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(valorTotal)}
                readOnly
                onChange={(event) => setValorComprometido(event.target.value)}
              />
            </FormGroup>
                )}
          </FormContent>

          <Header title='Condições de pagamento' subHeader fullwidth/>
          <FormContent $items>
            <FormGroup oneOfFive>
              <Legend>Nº de dias para {parcelamento ? 'o 1º' : 'o'} pagamento:</Legend>
              <Input placeholder='Ex.: 28' value={onlyNumberFormat(String(diasVencimento))} type='text' pattern={'[0-9]'} onChange={(event) => handleChangeDataVencimento(event.target.value)} />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Vencimento:</Legend>
              <Input placeholder='Ex.: 28' value={dataVencimento} type='date' onChange={(event) => setDataVencimento(event?.target.value)} />
            </FormGroup>
          </FormContent>
          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Parcelamento:</Legend>
              <ToggleSwitch name='Parcelamento' checked={parcelamento} onChange={handleChangeParcelamento} />
            </FormGroup>
          </FormContent>

          {parcelamento && (
            <>
              <FormContent>
                <FormGroup oneOfFive>
                  <Legend>Nº de parcelas:</Legend>
                  <Input
                    placeholder='Ex.: 28'
                    type='number'
                    value={numeroParcelas}
                    onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
                  />
                </FormGroup>
              </FormContent>

              {parcelas.map((parcela, index) => {
                return (
                  <FormContent key={parcela.id} $items>
                    <FormGroup square>
                      <Legend>Parcela:</Legend>
                      <Input type='number' value={index + 1} readOnly $square/>
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Valor:</Legend>
                      <Input
                        type='text'
                        value={Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(Number(valorTotal) / parcelas.length)}
                        placeholder='Ex.: R$5.022,53'
                        onChange={(e) => handleChangeItemAndParcelaPrice(parcela.id, 'valor', e.target.value, setParcelas)}
                      />
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Vencimento:</Legend>
                      <Input
                        type='date'
                        value={parcela.vencimento}
                        //onFocus={() => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', calculaDataParcelas(parcela.id), setParcelas)}
                        onChange={(e) => handleChangeItemAndParcelaPrice(parcela.id, 'vencimento', e.target.value, setParcelas)}
                      />
                    </FormGroup>
                  </FormContent>
                )
              })}
            </>
          )}
          {/* <Header title='Documentos' fullwidth subHeader />
          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Enviar NF:</Legend>
              <Input
                type='file'
                onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
              />
            </FormGroup>
          </FormContent>

          <FormContent>
            <FormGroup oneOfFive>
              <Legend>Enviar comprovante:</Legend>
              <Input
                type='file'
                onChange={handleNumeroParcelasChange} // Chama a função ao mudar o número de parcelas
              />
            </FormGroup>
          </FormContent> */}
        </Form>

        <ButtonContainer>
          <Button $green onClick={() => handleSubmitLancamento(itens, parcelas, parcelamento, dataVencimento, observacao)}>Gravar lançamento</Button>
        </ButtonContainer>
      </Content>
    </GlobalContainer>
  )
}

export default Lancamentos
