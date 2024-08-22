/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState, type ChangeEvent, type FormEvent } from 'react'

import { Legend } from '../../assets/styles/global'

import LoadingContext from '../../contexts/loadingContext'
import AuthContext from '../../contexts/authContext'

import logo from '../../assets/images/marca_sgo_preferencial.svg'
import cliente from '../../assets/images/cliente.svg'

import FormGroup from '../../components/FormGroup'
import Input from '../../components/Input'
import Button from '../../components/Button'

import WellcomeMessage from '../../utils/wellcomeMessage'
import isEmailValid from '../../utils/isEmailValid'

import useErrors from '../../hooks/useErrors'

import {
  Container, SgoContainer, Name, FormContainer, Form, Logo, Text, Cliente, LogoCliente
} from './styles'

const Login: React.FC = () => {
  const wellcomeMessage = WellcomeMessage()

  const { changeLoading } = useContext(LoadingContext)
  const { signIn } = useContext(AuthContext)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const {
    errors, setError, removeError, getErrorMessageByFieldName
  } = useErrors()

  const loginIsValid = isEmailValid(login) && password && errors.length === 0

  const handleChangelogin = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    setLogin(email)

    if (!email || !isEmailValid(email)) {
      setError({ field: 'email', message: 'Digite um e-mail válido para entrar.' })
    } else {
      removeError('email')
    }
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value
    setPassword(password)

    if (!password) {
      setError({ field: 'password', message: 'Digite uma senha válida para entrar.' })
    } else {
      removeError('password')
    }
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    changeLoading(true, 'Fazendo login...')

    await signIn({ email: login, password })
  }

  return (
    <Container>
      <SgoContainer>
        <Logo src={logo} />
        <Name>Sistema de gestão de obras</Name>
      </SgoContainer>
      <FormContainer>
        <Form onSubmit={handleLogin}>
          <Text>
            Olá, {wellcomeMessage}!
          </Text>
          <Text>
            Digite os dados abaixo para acessar o sistema.
          </Text>
          <FormGroup $error={getErrorMessageByFieldName('email')}>
            <Legend>Digite seu e-mail</Legend>
            <Input
              placeholder="Ex.: contato@sgo.com.br"
              type="email"
              onChange={handleChangelogin}
              value={login}
              $error={!!getErrorMessageByFieldName('email')}
            />
          </FormGroup>

          <FormGroup $error={getErrorMessageByFieldName('password')}>
            <Legend>Digite a senha</Legend>
            <Input
              placeholder="*************"
              type="password"
              onChange={handleChangePassword}
              value={password}
              $error={!!getErrorMessageByFieldName('password')}
            />
          </FormGroup>
          <Button type="submit" disabled={!loginIsValid}>Entrar</Button>
          <Cliente>
            <LogoCliente src={cliente} />
          </Cliente>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default Login
