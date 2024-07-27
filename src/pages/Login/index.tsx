/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../../assets/images/marca_sgo_preferencial.svg'
import cliente from '../../assets/images/miranto.svg'

import FormGroup from '../../components/FormGroup'
import Input from '../../components/Input'
import Button from '../../components/Button'

import WellcomeMessage from '../../utils/wellcomeMessage'
import isEmailValid from '../../utils/isEmailValid'

import useErrors from '../../hooks/useErrors'

import {
  Container, SgoContainer, Name, FormContainer, Form, Logo, Text, Legend, Cliente, LogoCliente
} from './styles'

export default function Login () {
  const navigate = useNavigate()
  const wellcomeMessage = WellcomeMessage()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const {
    errors, setError, removeError, getErrorMessageByFieldName
  } = useErrors()
  const loginIsValid = (isEmailValid(login) && password && errors.length === 0)

  function handleChangeUser (event: { target: { value: string } }) {
    const email = event.target.value
    setLogin(email)

    if (!email || !isEmailValid(email)) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError('email')
    }
  }

  function handleChangePassword (event: { target: { value: React.SetStateAction<string> } }) {
    setPassword(event.target.value)

    if (!event.target.value) {
      setError({ field: 'password', message: 'Digite uma senha válida para entrar.' })
    } else {
      removeError('password')
    }
  }

  async function handleLogin (event: { preventDefault: () => void }) {
    event.preventDefault()

    navigate('dashboard')

    // signIn({ login, password })
  }

  return (
    <Container>
      <SgoContainer>
        <Logo src={logo} />
        <Name>Sistema de gestão de obras</Name>
      </SgoContainer>
      <FormContainer>
        <Form>
          <Text>
            Olá, {wellcomeMessage}
            !
            <br />
            <br />
            Digite os dados abaixo para acessar o sistema.
          </Text>
          <FormGroup error={getErrorMessageByFieldName('email')}>
            <Legend>Digite seu e-mail</Legend>
            <Input placeholder="Ex.: contato@sgo.com.br" type="email" onChange={handleChangeUser} value={login} error={getErrorMessageByFieldName('email')} />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('password')}>
            <Legend>Digite a senha</Legend>
            <Input placeholder="*************" type="password" onChange={handleChangePassword} error={getErrorMessageByFieldName('password')} />
          </FormGroup>
          <Button onClick={handleLogin} disabled={!loginIsValid}>Entrar</Button>
          <Cliente>
            <LogoCliente src={cliente} />
          </Cliente>
        </Form>
      </FormContainer>
    </Container>
  )
}
