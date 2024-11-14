import React, {
  FormEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { Obra, RdoRda } from "./globalInterfaces";

export interface PropsLogin {
  handleLogin: FormEventHandler;
  wellcomeMessage: string;
  getErrorMessageByFieldName: Function;
  handleChangelogin: ChangeEventHandler;
  login: string;
  handleChangePassword: ChangeEventHandler;
  password: string;
  loginIsValid: boolean | string;
}

type HandleChangeMoreType = (
  type: string,
  setItems: Dispatch<SetStateAction<any[]>>,
  itemsDb: any[]
) => void;

export interface PropsDashboard {
  refPage: RefObject<HTMLElement>;
  obras: Obra[];
  itensObras: Obra[];
  setItensObras: Dispatch<SetStateAction<any[]>>;
  handleChangeMore: HandleChangeMoreType;
  more: string[];
  width: number;
  itensRdo: RdoRda[];
  rdos: RdoRda[];
  setItensRdos: Dispatch<SetStateAction<any[]>>;
  itensRda: RdoRda[];
  rdas: RdoRda[];
  setItensRdas: Dispatch<SetStateAction<any[]>>;
}
