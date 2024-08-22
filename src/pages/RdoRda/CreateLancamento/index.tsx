/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useMemo, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { FiPlus, FiX } from 'react-icons/fi'

import { GlobalContainer, Legend } from '../../../assets/styles/global'

import ModalContext from '../../../contexts/modalContext'

import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import FormGroup from '../../../components/FormGroup'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import ToggleSwitch from '../../../components/ToggleSwitch'

import { currencyFormat } from '../../../utils/currencyFormat'

import { AddItem, ButtonContainer, Content, Divisor, Form, FormContent } from './styles'

import { type TypeNewLancamento } from '../../../interfaces/globalInterfaces'

const CreateLancamento: React.FC<TypeNewLancamento> = ({ tipo, rdoRda, nameCliente, obraId, cliente_id }) => {
  const { type } = useParams()
  const { obra, clienteId, cliente } = useLocation().state
  const { isOpen } = useContext(ModalContext)
  const typeDocument = tipo?.toUpperCase() ?? type?.toUpperCase()
  const [parcelamento, setParcelamento] = useState(false)
  const [groupItems, setGroupItems] = useState([{ id: 1 }])
  const [itens, setItens] = useState<Array<{ id: number, etapa: number | null, subetapa: number | null, valor: string }>>([
    { id: 1, etapa: null, subetapa: null, valor: '' }
  ])
  const [parcelas, setParcelas] = useState<Array<{ id: number, vencimento: string | null, valor: string }>>([
    { id: 1, vencimento: '', valor: '' }
  ])
  const [numeroParcelas, setNumeroParcelas] = useState(1)
  const totalLancamentoValue = useMemo(() => {
    return itens.reduce<number>((acc, item) => acc + Number(item.valor || 0), 0)
  }, [itens])

  console.log(obra, clienteId, rdoRda, obraId, cliente_id)

  const handleAddItem = () => {
    const newId = groupItems.length + 1
    setGroupItems((prevstate) => [...prevstate, { id: newId }])
    setItens((prevstate) => [...prevstate, { id: newId, etapa: null, subetapa: null, valor: '' }])
  }

  const handleRemoveItem = (id: number) => {
    if (groupItems.length === 1) return

    setGroupItems((prevstate) => prevstate.filter((item) => item.id !== id))
    setItens((prevstate) => prevstate.filter((item) => item.id !== id))
  }

  const handleChangeItemAndparcelaPrice = (id: number, field: string, value: string, setItem: Dispatch<SetStateAction<any[]>>) => {
    const trataValue = value.includes('R$') ? value.replace('R$ ', '').replaceAll('.', '').replace(',', '.') : value
    setItem((prevstate) => prevstate.map((item) => (item.id === id ? { ...item, [field]: trataValue } : item)))
  }

  const handleNumeroParcelasChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value, 10) || 1
    setNumeroParcelas(numero)

    const novasParcelas = Array.from({ length: numero }, (_, i) => ({
      id: i + 1,
      vencimento: '',
      valor: ''
    }))

    setParcelas(novasParcelas)
  }

  const handleChangeParcelamento = () => {
    setParcelamento(!parcelamento)
  }

  return (
    <GlobalContainer $modal>
      {!isOpen && <Menu />}
      <Header title={`Lançamento em ${typeDocument}`} fullwidth={!!isOpen} cliente={cliente ?? nameCliente} goBack={!isOpen} />
      <Content $fullwidth={!!isOpen}>
        <Form>
          <FormContent>
            <FormGroup oneOftree>
              <Legend>Cliente:</Legend>
              <Input type='text' placeholder='Digite o nome do cliente' />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Fornecedor:</Legend>
              <Input type='text' placeholder='Digite o nome do fornecedor' />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Contrato:</Legend>
              <Input type='text' placeholder='Digite o nome de um fornecedor' />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Data lançamento:</Legend>
              <Input type='date' />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Nº da NF:</Legend>
              <Input type='tel' placeholder='Ex.: 123456' />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Data emissão NF:</Legend>
              <Input type='date' />
            </FormGroup>
          </FormContent>

          <Header title='Itens do lançamento' subHeader modal={!!isOpen} fullwidth />
          {groupItems.map((groupItem) => {
            const [valueInfos] = itens.filter((item) => item.id === groupItem.id)
            const value = valueInfos.valor

            return (
              <FormContent key={groupItem.id} $items>
                <FormGroup oneOfFive>
                  <Legend>Etapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndparcelaPrice(groupItem.id, 'etapa', e.target.value, setItens)}>
                    <option value="">Selecione uma etapa</option>
                  </Select>
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Subetapa:</Legend>
                  <Select onChange={(e) => handleChangeItemAndparcelaPrice(groupItem.id, 'subetapa', e.target.value, setItens)}>
                    <option value="">Selecione uma subetapa</option>
                  </Select>
                </FormGroup>

                <FormGroup oneOfFour>
                  <Legend>Descrição:</Legend>
                  <Input type='text' placeholder='Digite a descrição do lançamento' />
                </FormGroup>

                <FormGroup oneOfFive>
                  <Legend>Valor:</Legend>
                  <Input type='text' value={currencyFormat(value)} placeholder='Ex.: R$5.022,53' onChange={(e) => handleChangeItemAndparcelaPrice(groupItem.id, 'valor', e.target.value, setItens)} />
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
            <FormGroup oneOfFive>
              <Legend>Valor total {itens.length > 1 ? 'dos itens' : 'do item'}:</Legend>
              <Input placeholder='Valor total itens' value={currencyFormat(String(totalLancamentoValue))} readOnly />
            </FormGroup>
          </FormContent>

          <Header title='Condições de pagamento' subHeader fullwidth/>
          <FormContent $items>
            <FormGroup oneOfFive>
              <Legend>Nº de dias para {parcelamento ? 'o 1º' : 'o'} pagamento:</Legend>
              <Input placeholder='Ex.: 28' type='number' />
            </FormGroup>

            <FormGroup oneOfFive>
              <Legend>Vencimento:</Legend>
              <Input placeholder='Ex.: 28' type='date' />
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
                    <FormGroup oneOfFive>
                      <Legend>Número parcela:</Legend>
                      <Input type='number' value={index + 1} readOnly />
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Valor:</Legend>
                      <Input
                        type='text'
                        value={currencyFormat(String(Number(totalLancamentoValue) / 2))}
                        placeholder='Ex.: R$5.022,53'
                        onChange={(e) => handleChangeItemAndparcelaPrice(parcela.id, 'valor', e.target.value, setParcelas)}
                      />
                    </FormGroup>

                    <FormGroup oneOfFive>
                      <Legend>Vencimento:</Legend>
                      <Input type='date' />
                    </FormGroup>
                  </FormContent>
                )
              })}
            </>
          )}
          <Header title='Documentos' fullwidth subHeader />
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
          </FormContent>

          <ButtonContainer>
          <Button $green>Gravar lançamento</Button>
        </ButtonContainer>
        </Form>
      </Content>
    </GlobalContainer>
  )
}

export default CreateLancamento
