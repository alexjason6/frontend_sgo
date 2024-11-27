/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'

import { Legend } from '../../assets/styles/global'

import logo from '../../assets/images/marca_sgo_preferencial.svg'
import cliente from '../../assets/images/cliente.svg'

import FormGroup from '../../components/FormGroup'
import Input from '../../components/Input'
import Button from '../../components/Button'

import {
  Container, SgoContainer, Name, FormContainer, Form, Logo, Text, Cliente, LogoCliente
} from './styles'
import useLogin from './useLogin'


const Login: React.FC = () => {
  const {
    wellcomeMessage,
    loginIsValid,
    login,
    password,
    getErrorMessageByFieldName,
    handleChangelogin,
    handleChangePassword,
    handleLogin,
  } = useLogin()

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
