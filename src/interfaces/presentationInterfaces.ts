import React, {
  FormEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  RefObject,
  ChangeEvent,
} from "react";
import {
  Cliente,
  Etapa,
  Obra,
  Orcamento,
  RdoRda,
  Subetapa,
  TiposOrcamentos,
} from "./globalInterfaces";

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

type HandleChangeItem = (
  event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  fieldName: string,
  message: string,
  etapaId?: number
) => void;

type HandleChangeInfos = (
  fieldName: string,
  message: string,
  value: string,
  setState: Dispatch<SetStateAction<any>>
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

export interface PropsCreateEditOrcamentos {
  getErrorMessageByFieldName: Function;
  clientes: Cliente[];
  obrasCliente: Obra[];
  modelos: TiposOrcamentos[];
  nome: string;
  orcamento?: Orcamento;
  items: {
    id: number;
    nome: string;
    valorTotal: string;
    idEtapa: number;
    numero: string;
    fornecedor?: string;
    subetapas: {
      id: number;
      nome: string;
      unidade: string;
      numero: string;
      etapa: number;
      idSubetapa: number;
      quantidade: string;
      valor: string;
      fornecedor?: string;
      valorTotal: string;
    }[];
  }[];
  etapas: Etapa[];
  subetapas: Subetapa[];
  formIsValid: boolean | string | number;
  etapasOpened: number[];
  idCliente: number;
  obra: number;
  modelo: number;
  setNome: Dispatch<SetStateAction<string>>;
  setIdCliente: Dispatch<SetStateAction<number>>;
  setObra: Dispatch<SetStateAction<number>>;
  setModelo: Dispatch<SetStateAction<number>>;
  handleChangeItem: HandleChangeItem;
  handleChangeOrcamentoInfos: HandleChangeInfos;
  handleCreateOrEditItem: any;
  handleRemoveSubitem: Function;
  handleRemoveEtapa: Function;
  handleAddSubetapa: Function;
  handleAddEtapa: any;
  handleChangeVisibilityOfSubetapas: Function;
  updateSubitem: Function;
}
