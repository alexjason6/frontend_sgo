import React, {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import LoadingContext from "../../contexts/loadingContext";
import AuthContext from "../../contexts/authContext";

import WellcomeMessage from "../../utils/wellcomeMessage";
import isEmailValid from "../../utils/isEmailValid";

import useErrors from "../../hooks/useErrors";
const useLogin = () => {
  const wellcomeMessage = WellcomeMessage();

  const { changeLoading } = useContext(LoadingContext);
  const { signIn, loadingAuth } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();

  const loginIsValid = isEmailValid(login) && password && errors.length === 0;

  const handleChangelogin = (event: ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setLogin(email);

    if (!email || !isEmailValid(email)) {
      setError({
        field: "email",
        message: "Digite um e-mail válido para entrar.",
      });
    } else {
      removeError("email");
    }
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);

    if (!password) {
      setError({
        field: "password",
        message: "Digite uma senha válida para entrar.",
      });
    } else {
      removeError("password");
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    changeLoading(true, "Fazendo login...");

    await signIn({ email: login, password });
  };

  useEffect(() => {
    if (!loadingAuth) {
      changeLoading(false);
    }
  }, [loadingAuth]);

  return {
    wellcomeMessage,
    loginIsValid,
    login,
    password,
    getErrorMessageByFieldName,
    handleChangelogin,
    handleChangePassword,
    handleLogin,
  };
};

export default useLogin;
