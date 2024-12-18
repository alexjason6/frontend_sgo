/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { FiPlus, FiX } from 'react-icons/fi'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import Header from '../../../Header'
import Menu from '../../../Menu'
import FormGroup from '../../../FormGroup'
import Input from '../../../Input'
import Select from '../../../Select'
import Button from '../../../Button'

import CreateObra from "../Obras";
import CreateEtapa from "../Etapas";
import CreateCliente from "../Clientes";
import CreateModelo from "../Modelos";

import { currencyFormat } from '../../../../utils/currencyFormat'

import { AddItem, ButtonContainer, Container, Divisor, Form, FormContent, Title, AddSubitem, Arrow, ArrowSubitem } from './styles'
import useOrcamentos from './useOrcamentos'

interface Props {
  idOrcamento?: number | string
}

const Orcamentos: React.FC<Props> = ({idOrcamento}) => {
  const {
    id,
    orcamento,
    clientes,
    items,
    idCliente,
    obra,
    obrasCliente,
    modelo,
    modelos,
    nome,
    etapasOpened,
    etapas,
    subetapas,
    formIsValid,
    changeModal,
    getErrorMessageByFieldName,
    handleChangeOrcamentoInfos,
    setIdCliente,
    setObra,
    setModelo,
    setNome,
    handleChangeVisibilityOfSubetapas,
    handleChangeItem,
    handleRemoveEtapa,
    updateSubitem,
    handleRemoveSubitem,
    handleAddSubetapa,
    handleAddEtapa,
    handleCreateOrEditItem,
  } = useOrcamentos()

  return (
    <GlobalContainer>
    <Menu />
    <Header title={!orcamento ? 'Novo orçamento' : 'Editar orçamento'} goBack/>
    <Container>
      <Form>
        <FormContent>
          <FormGroup oneOftree $error={getErrorMessageByFieldName('cliente')}>
            <Legend>Cliente: <sup>*</sup></Legend>
            <Select
              onChange={(e) => {
                if (e.target.value === '0') return changeModal(<CreateCliente />);
                handleChangeOrcamentoInfos('cliente', 'O cliente precisa ser selecionado.', e.target.value, setIdCliente);
              }}
              $error={!!getErrorMessageByFieldName('cliente')}
              required
              value={idCliente}
              name={String(idCliente)}
            >
              <option>Selecione um cliente</option>
              <option value='0'>Cadastrar novo cliente</option>
              <option disabled>________________________________</option>
              {clientes.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup oneOfFour $error={getErrorMessageByFieldName('obra')}>
            <Legend>Obra: <sup>*</sup></Legend>
            <Select
              onChange={(e) => {
                if (e.target.value === '0') return changeModal(<CreateObra />);
                handleChangeOrcamentoInfos('obra', 'A obra precisa ser selecionada.', e.target.value, setObra);
              }}
              $error={!!getErrorMessageByFieldName('obra')}
              required
              value={obra}
              name={String(obra)}
            >
              <option>Selecione uma obra</option>
              <option value='0'>Cadastrar nova obra</option>
              <option disabled>________________________________</option>
              {obrasCliente.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup oneOfFive $error={getErrorMessageByFieldName('modelo')}>
            <Legend>Modelo orçamento: <sup>*</sup></Legend>
            <Select
              onChange={(e) => {
                if (e.target.value === '0') return changeModal(<CreateModelo />);
                handleChangeOrcamentoInfos('modelo', 'Por favor selecione o modelo do orçametno.', e.target.value, setModelo);
              }}
              $error={!!getErrorMessageByFieldName('modelo')}
              required
              value={modelo}
              name={String(modelo)}
            >
              <option>Selecione um modelo</option>
              <option value='0'>Cadastrar novo modelo</option>
              <option disabled>________________________________</option>
              {modelos.map((item) => (
                <option key={item.id} value={item.id}>{item.nome}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup oneOfFour $error={getErrorMessageByFieldName('nome')}>
            <Legend>Nome orçamento: <sup>*</sup></Legend>
            <Input
              value={nome}
              type='text'
              placeholder='Ex.: Betim flex geral'
              onChange={(e) => handleChangeOrcamentoInfos('nome', 'Digite um nome para o orçamento.', e.target.value, setNome)}
              required
              $error={!!getErrorMessageByFieldName('nome')}
              name={nome}
            />
          </FormGroup>
        </FormContent>

        <Title>Itens do orçamento</Title>
        {items?.map((etapa) => {

          return (
          <React.Fragment key={etapa.id}>
            <FormContent $items>
              {etapa.subetapas.length > 0 && <Arrow $open={!!etapasOpened?.find((item) => item === Number(etapa.id))} onClick={() => handleChangeVisibilityOfSubetapas(Number(etapa.id))} />}
              <FormGroup oneOfSix  $error={getErrorMessageByFieldName('numEtapa')}>
                <Legend>Número:</Legend>
                <Input
                  type="text"
                  value={etapa.numero}
                  placeholder="Ex.: 1"
                  $square
                  $error={!!getErrorMessageByFieldName('numEtapa')}
                  onChange={(e) => handleChangeItem(e, 'numEtapa', e.target.value, etapa.id)}
                  name={etapa.numero}
                />
              </FormGroup>

              <FormGroup oneOftree $error={getErrorMessageByFieldName('etapa')}>
                <Legend>Etapa:</Legend>
                 <Select
                  id={String(etapa.id)}
                  onChange={(e) => {
                    if (e.target.value === '0') return changeModal(<CreateEtapa />);
                    handleChangeItem(e, 'etapa', e.target.value, etapa.id);
                  }}
                  $error={!!getErrorMessageByFieldName('etapa')}
                  value={etapa.id}
                  >
                  <option value="">Selecione uma etapa</option>
                  <option value='0'>Cadastrar nova etapa</option>
                  <option disabled>________________________________</option>
                  {etapas.length > 0 && etapas.sort((a, b) => a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })).map((item) => {
                    return (
                    <option key={item.id} value={item.id} className={String(item.id)}>{item.nome}</option>
                  )})}
                </Select>
              </FormGroup>

              <FormGroup oneOfFive>
                <Legend>Valor etapa:</Legend>
                <Input
                  type="text"
                  value={Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(Number(etapa?.valorTotal) || 0)}
                  placeholder="Ex.: R$5.022,53"
                  readOnly
                  name={String(etapa.id)}
                />
              </FormGroup>

              <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveEtapa(etapa.id)}>
                <FiX color="red" size={23} />
              </p>
            </FormContent>

              {etapa.subetapas?.map((subitem: any, index: number) => {
                const valorTotal = subitem.valor * subitem.quantidade
                const etapaActive = document.getElementsByClassName(String(etapa.id))[0]?.className as unknown as HTMLOptionElement | any
                const subetapasActive = subetapas.filter((item) => Number(item.etapa) === Number(etapaActive))

                return (
                  <React.Fragment key={index}>
                  {!!etapasOpened?.find((item) => Number(item) === Number(etapa.id)) &&
                    <FormContent $items>
                      <ArrowSubitem />
                      <FormGroup oneOfSix $error={getErrorMessageByFieldName('numSubEtapa')}>
                      <Legend>Número:</Legend>
                      <Input
                        type="text"
                        value={subitem.numero || ''}
                        $error={!!getErrorMessageByFieldName('numSubEtapa')}
                        onChange={(e) => updateSubitem(etapa.id, subitem.id, {numero: e.target.value, etapa: Number(etapa.numero)})}
                        placeholder="Ex.: 01.01"
                        $square
                        name={subitem.id}
                      />
                    </FormGroup>

                      <FormGroup oneOfFive $error={getErrorMessageByFieldName('subetapa')}>
                        <Legend>Subetapa:</Legend>
                        <Select
                          onChange={(e) => {

                            if (e.target.value === '0|0') return changeModal(<CreateEtapa />);
                            updateSubitem(etapa.id, subitem.id, { nome: e.target.value.split('|')[1], idSubetapa: Number(e.target.value.split('|')[0]) });
                          }}
                          $error={!!getErrorMessageByFieldName('subetapa')}
                          value={`${subitem.idSubetapa || ''}|${subitem.nome || ''}`}
                        >
                          <option>Selecione a subetapa</option>
                          <option value='0|0'>Cadastrar nova subetapa</option>
                          <option disabled>________________________________</option>
                          {subetapasActive.sort((a, b) => a.nome.localeCompare(b.nome, 'pt', { sensitivity: 'base' })).map((servico) => {
                            return (
                              <option key={servico.id} value={`${servico.id}|${servico.nome}`} >{servico.nome}</option>
                            )
                          })}
                        </Select>
                      </FormGroup>

                    <FormGroup oneOfSix $error={getErrorMessageByFieldName('unidade')}>
                      <Legend>Unidade:</Legend>
                      <Select
                        value={subitem.unidade}
                        $error={!!getErrorMessageByFieldName('unidade')}
                        onChange={(e) => updateSubitem(Number(etapaActive), subitem.id, { unidade: e.target.value })}
                      >
                        <option value='0'>Selecione uma medida</option>
                        <option value='apartamento'>Apto</option>
                        <option value='dia'>Dia</option>
                        <option value='kg'>Kg</option>
                        <option value='mês'>Mês</option>
                        <option value='metro'>M</option>
                        <option value='m2'>M2</option>
                        <option value='m3'>M3</option>
                        <option value='unidade'>Unidade</option>
                        <option value='verba'>Verba</option>
                        <option value='viagem'>Viagem</option>
                      </Select>
                    </FormGroup>

                    <FormGroup oneOfSix $error={getErrorMessageByFieldName('quantidade')}>
                      <Legend>Quantidade:</Legend>
                      <Input
                        type="tel"
                        value={subitem.quantidade}
                        $error={!!getErrorMessageByFieldName('quantidade')}
                        onChange={(e) => updateSubitem(etapa.id, subitem.id, { quantidade: e.target.value })}
                        placeholder="Quantidade"
                        $square
                        name='quantidade'
                      />
                    </FormGroup>

                    <FormGroup oneOfFive $error={getErrorMessageByFieldName('valor')}>
                      <Legend>Valor unit.:</Legend>
                      <Input
                        type="tel"
                        $error={!!getErrorMessageByFieldName('valor')}
                        defaultValue={subitem.valor}
                        value={currencyFormat(subitem.valor)}
                        onChange={(e) => {
                          const cleanedValue = e.target.value.replace(/\D/g, '');

                          let integerPart = cleanedValue.slice(0, -2);
                          let decimalPart = cleanedValue.slice(-2);

                          if (decimalPart.length > 2) {
                            integerPart += decimalPart.slice(0, -2);
                            decimalPart = decimalPart.slice(-2);
                          }

                          const trataValue = parseFloat(`${integerPart}.${decimalPart}`).toFixed(2);

                          updateSubitem(etapa.id, subitem.id, { valor: trataValue })}}
                        placeholder="Valor"
                        name={subitem.id}
                      />
                    </FormGroup>

                    <FormGroup oneOfFive $error={getErrorMessageByFieldName('valorTotal')}>
                      <Legend>Valor total:</Legend>
                      <Input
                        type="tel"
                        value={Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(valorTotal || 0)}
                        placeholder="Valor total"
                        $error={!!getErrorMessageByFieldName('valorTotal')}
                        readOnly
                        name='valorTotal'
                      />
                    </FormGroup>

                    <p style={{ cursor: 'pointer' }} onClick={() => handleRemoveSubitem(etapa.id, subitem.id)}>
                      <FiX color="red" size={23} />
                    </p>
                  </FormContent>
                  }
                  </React.Fragment>
                )
              })}

            <AddSubitem>
                <p onClick={() => handleAddSubetapa(etapa.id)}>
                  Adicionar subetapa <FiPlus color="green" size={23} />
                </p>
              </AddSubitem>
              <Divisor />
          </React.Fragment>
          )
        })}
        <AddItem>
          <p onClick={handleAddEtapa}>
            Adicionar etapa <FiPlus color="green" size={23} />
          </p>
        </AddItem>
      </Form>
      <ButtonContainer>
        <span>Valor total do orçamento:<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(items.reduce<number>((acc, item) => { return acc + (Number(item?.valorTotal) || 0) }, 0))}</p></span>
        <Button disabled={!formIsValid} $green onClick={handleCreateOrEditItem}>Salvar</Button>
      </ButtonContainer>
    </Container>
  </GlobalContainer>
  )
}

export default Orcamentos
