/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type ChangeEvent } from 'react'

import { GlobalContainer, Legend } from '../../../../assets/styles/global'

import ModalContext from '../../../../contexts/modalContext'
import LoadingContext from '../../../../contexts/loadingContext'
import EtapasContext from '../../../../contexts/etapasContext'
import AuthContext from '../../../../contexts/authContext'

import EtapasServices from '../../../../services/sgo/EtapasServices'

import CreateOrcamento from '../Orcamentos'

import Menu from '../../../Menu'
import Header from '../../../Header'
import Button from '../../../Button'
import FormGroup from '../../../FormGroup'
import Input from '../../../Input'

import { ButtonContainer, Container, Form, FormContent, Title } from './styles'
import { toastEventManager } from '../../../../utils/toast'
import Select from '../../../Select'

const CreateEtapa: React.FC = () => {
  const { isOpen, changeModal } = useContext(ModalContext)
  const { token } = useContext(AuthContext)
  const { changeLoading } = useContext(LoadingContext)
  const { etapas, listEtapas, listSubetapas } = useContext(EtapasContext)

  const [nomeEtapa, setNomeEtapa] = useState<string>()
  const [numeroEtapa, setNumeroEtapa] = useState<number>()

  const [nomeSubetapa, setNomeSubetapa] = useState<string>()
  const [numeroEtapaParent, setEtapaParent] = useState<number>()
  const [numeroSubetapa, setNumeroSubetapa] = useState<number>()

  const handleGoBack = () => {
    if (isOpen) {
      changeModal(<CreateOrcamento />)
    }
  }

  const handleChangeEtapaName = (event: ChangeEvent<HTMLInputElement>) => {
    setNomeEtapa(event.target.value)
  }

  const handleChangeEtapaNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setNumeroEtapa(Number(event.target.value))
  }

  const handleChangeSubetapaName = (event: ChangeEvent<HTMLInputElement>) => {
    setNomeSubetapa(event.target.value)
  }

  const handleChangeSubetapaNumber = (event: ChangeEvent<HTMLInputElement>) => {
    setNumeroSubetapa(Number(event.target.value))
  }

  const handleChangeEtapaParentNumber = (event: ChangeEvent<HTMLSelectElement>) => {
    setEtapaParent(Number(event.target.value))
  }

  const handleCreateEtapa = async (event: any) => {
    event.preventDefault()

    try {
      changeLoading(true, 'Criando etapa...')

      const data = {
        nome: nomeEtapa,
        numero: numeroEtapa,
        status: 1
      }

      const create = await EtapasServices.etapasCreate({ token, data })

      changeLoading(true, 'atualizando lista de etapas...')
      await listEtapas({ token })

      if (create.id) {
        toastEventManager.emit('addtoast', {
          type: 'success',
          text: 'Etapa cadastrada com sucesso.',
          duration: 5000
        })
      }

      await listEtapas({ token })
    } catch (error) {
      toastEventManager.emit('addtoast', {
        type: 'danger',
        text: 'Erro ao criar a etapa.',
        duration: 5000
      })
      console.error('Erro ao criar a etapa:', error)
    } finally {
      changeLoading(false)
    }
  }

  const handleCreateSubetapa = async (event: any) => {
    event.preventDefault()

    try {
      changeLoading(true, 'Criando subetapa...')

      const data = {
        nome: nomeSubetapa,
        numero: numeroSubetapa,
        etapa: numeroEtapaParent,
        status: 1
      }

      const create = await EtapasServices.subetapasCreate({ token, data })

      changeLoading(true, 'atualizando lista de subetapas...')
      await listEtapas({ token })

      if (create.id) {
        toastEventManager.emit('addtoast', {
          type: 'success',
          text: 'Subetapa cadastrada com sucesso.',
          duration: 5000
        })
      }

      await listSubetapas({ token })
    } catch (error) {
      toastEventManager.emit('addtoast', {
        type: 'danger',
        text: 'Erro ao criar a subetapa.',
        duration: 5000
      })
      console.error('Erro ao criar a subetapa:', error)
    } finally {
      changeLoading(false)
    }
  }

  return (
    <GlobalContainer>
      {!isOpen && <Menu />}
      <Header title="Criar nova etapa e subetapa" fullwidth={!!isOpen} goBack={!isOpen} />
      <Container>
        <Form>
          <Title>Nova etapa</Title>
          <FormContent>
            <FormGroup oneOfFour>
              <Legend>Nome da etapa:</Legend>
              <Input type='text' placeholder='Ex.: Serviços de fundação' onChange={(event) => handleChangeEtapaName(event)} />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Número etapa:</Legend>
              <Input type='tel' placeholder='Ex.: 10' onChange={(event) => handleChangeEtapaNumber(event)} />
            </FormGroup>

            <FormGroup>
              <ButtonContainer>
                <Button $green onClick={handleCreateEtapa}>Criar etapa</Button>
              </ButtonContainer>
            </FormGroup>
          </FormContent>

          <Title onClick={handleGoBack}>Nova subetapa</Title>
          <FormContent>
            <FormGroup oneOfFour>
              <Legend>Nome da subetapa:</Legend>
              <Input type='text' placeholder='Ex.: Perfuração de tubulão' onChange={(event) => handleChangeSubetapaName(event)} />
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Número etapa:</Legend>
              <Select onChange={handleChangeEtapaParentNumber}>
                <option>Selecione uma etapa</option>
                {etapas.map((etapa) => (
                  <option key={etapa.id} value={etapa.id}>{etapa.numero} - {etapa.nome}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup oneOfFour>
              <Legend>Número subetapa:</Legend>
              <Input type='text' placeholder='Ex.: 01' onChange={(event) => handleChangeSubetapaNumber(event)} />
            </FormGroup>

            <FormGroup>
              <ButtonContainer>
                <Button $green onClick={handleCreateSubetapa}>Criar subetapa</Button>
              </ButtonContainer>
            </FormGroup>
          </FormContent>
        </Form>

        {/* {isOpen && <ButtonContainer $fullwidth>
          <p onClick={handleGoBack}>Voltar para orçamentos</p>
        </ButtonContainer>} */}
      </Container>
    </GlobalContainer>
  )
}

export default CreateEtapa
