import React, {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useCallback,
} from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

import ModalContext from "../../../../contexts/modalContext";
import ClientesContext from "../../../../contexts/clientesContext";
import ObrasContext from "../../../../contexts/obrasContext";
import OrcamentosContext from "../../../../contexts/orcamentosContext";
import LoadingContext from "../../../../contexts/loadingContext";
import AuthContext from "../../../../contexts/authContext";
import EtapasContext from "../../../../contexts/etapasContext";

import OrcamentoMapper from "../../../../services/mappers/OrcamentoMapper";
import OrcamentosServices from "../../../../services/sgo/OrcamentosServices";

import Toast from "../../../../utils/toast";

import useErrors from "../../../../hooks/useErrors";

import {
  type Obra,
  type Orcamento,
} from "../../../../interfaces/globalInterfaces";
import useItems from "./useItems";

const useOrcamentos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    items,
    handleAddEtapa,
    handleRemoveEtapa,
    handleAddSubetapa,
    handleRemoveSubitem,
    handleChangeItem,
    updateSubitem,
    setItems,
  } = useItems();
  const { token } = useContext(AuthContext);
  const { changeModal } = useContext(ModalContext);
  const { clientes } = useContext(ClientesContext);
  const { changeLoading } = useContext(LoadingContext);
  const { obras } = useContext(ObrasContext);
  const { modelos, listOrcamentos, getOrcamento } =
    useContext(OrcamentosContext);
  const { etapas, subetapas, listEtapas, listSubetapas } =
    useContext(EtapasContext);
  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors();
  const [orcamento, setOrcamento] = useState<Orcamento>();
  const [idCliente, setIdCliente] = useState<number>(0);
  const [nome, setNome] = useState<string>("");
  const [status] = useState<number>(1);
  const [modelo, setModelo] = useState(0);
  const [obra, setObra] = useState<number>(0);
  const [obrasCliente, setObrasCliente] = useState<Obra[]>([]);
  const [etapasOpened, setEtapasOpened] = useState<number[]>([]);

  const dataCriacao = String(moment().unix());
  const formIsValid =
    nome && idCliente && obra && modelo && status && errors.length === 0;

  const handleChangeOrcamentoInfos = (
    fieldName: string,
    message: string,
    value: string,
    setState: Dispatch<SetStateAction<any>>
  ) => {
    if (!value) {
      setError({ field: fieldName, message });
    } else {
      removeError(fieldName);
    }

    if (fieldName === "cliente" && Number(value) > 0) {
      const [cliente] = clientes.filter((item) => item.id === Number(value));

      const obrasCliente = obras.filter(
        (item) => item.id_cliente === Number(value)
      );

      setObrasCliente(obrasCliente);
      setState(Number(cliente.id));

      return;
    }

    setState(Number(value) || value);
  };

  const handleCreateOrEditItem = async () => {
    changeLoading(true, "Criando orçamento...");
    const subitens = items.flatMap((itemOrcamento) =>
      itemOrcamento.subetapas.filter((subitemOrcamento) => subitemOrcamento)
    );

    const mapItemProps = ({
      idEtapa: id,
      nome,
      numero,
      valorTotal: valor_total,
    }: any) => ({
      id,
      nome,
      numero,
      valor_total,
    });

    const mapSubitemProps = ({
      idSubetapa: id,
      numero,
      nome,
      etapa,
      quantidade,
      unidade,
      valor: valor_unitario,
      valorTotal: valor_total,
    }: any) => ({
      id,
      numero,
      nome,
      etapa,
      quantidade,
      unidade,
      valor_unitario,
      valor_total,
    });

    const dataOrcamentoCreate = {
      nome,
      dataCriacao,
      status,
      modelo,
      idCliente,
      obra,
      item: items.map(({ subetapas, ...rest }) => mapItemProps(rest)),
      subitem: subitens.map((subitem) => mapSubitemProps(subitem)),
    };

    const dataOrcamentoUpdate = {
      ...dataOrcamentoCreate,
      id: Number(id),
    };

    try {
      changeLoading(true, "Enviando os dados do orçamento...");
      const mapperOrcamentoCreate =
        OrcamentoMapper.toPersistence(dataOrcamentoCreate);
      const mapperOrcamentoUpdate =
        OrcamentoMapper.toPersistence(dataOrcamentoUpdate);

      const create = !id
        ? await OrcamentosServices.create({ token, mapperOrcamentoCreate })
        : await OrcamentosServices.update({ token, mapperOrcamentoUpdate });

      changeLoading(true, "atualizando lista de orçamentos...");
      await listOrcamentos({ token });

      if (create.id) {
        Toast({
          type: "success",
          text: !id
            ? "Orçamento cadastrado com sucesso."
            : "Orçamento editado com sucesso.",
          duration: 5000,
        });
        if (!id) {
          navigate(-1);
        }
      }
    } catch (error) {
      Toast({
        type: "danger",
        text: !id ? "Erro ao criar orçamento." : "Erro ao editar orçamento.",
        duration: 5000,
      });
      console.error("Erro ao criar/editar orçamento:", error);
    } finally {
      changeLoading(false);
    }
  };

  const getData = useCallback(async () => {
    changeLoading(true, "Carregando etapas...");
    await listEtapas({ token });

    changeLoading(true, "Carregando subetapas...");
    await listSubetapas({ token });

    changeLoading(false);
  }, [changeLoading, listEtapas, listSubetapas, token]);

  const handleChangeVisibilityOfSubetapas = (id: number) => {
    const [etapaIsOpened] = etapasOpened.filter((item) => item === id);

    if (etapaIsOpened) {
      const hideSubetapa = etapasOpened.filter((item) => item !== id);
      setEtapasOpened(hideSubetapa);
    } else {
      setEtapasOpened((prevstate) => [...prevstate, id]);
    }
  };

  const getInitialOrcamento = useCallback(async () => {
    try {
      const response = await getOrcamento({ token, id: Number(id) });

      if (response?.id) {
        setOrcamento(response);
        setIdCliente(response.id_cliente);
        setObra(response.obra);
        setNome(response.nome);
        setModelo(response.modelo);

        const initialObras = obras.filter(
          (item) => item.id_cliente === Number(response.id_cliente)
        );

        setObrasCliente(initialObras);

        const itemsWithSubitems = response.item
          ?.sort((a: any, b: any) =>
            Number(a.numero) > Number(b.numero) ? 1 : -1
          )
          .map((item: any) => {
            const subitemsForItem = response.subitem
              .filter(
                (subitem: any) => Number(subitem.etapa) === Number(item.numero)
              )
              .map((subitem: any) => ({
                id: subitem.id,
                nome: subitem.nome,
                unidade: subitem.unidade,
                numero: subitem.numero,
                etapa: subitem.etapa,
                idSubetapa: subitem.id,
                quantidade: subitem.quantidade,
                valor: subitem.valor_unitario,
                valorTotal: subitem.valor_total,
              }));

            return {
              id: item.id,
              nome: item.nome,
              valorTotal: item.valor_total,
              numero: item.numero,
              idEtapa: item.id,
              subetapas: subitemsForItem
                .sort((a: { numero: string }, b: { numero: string }) =>
                  Number(a.numero) > Number(b.numero) ? -1 : 1
                )
                .sort((a: { numero: any }, b: { numero: any }) => {
                  try {
                    const parseNumber = (num: string) =>
                      num
                        ?.split(".")
                        ?.map((part: string) => parseInt(part, 10) || 0);

                    const numA = parseNumber(a.numero);
                    const numB = parseNumber(b.numero);

                    for (
                      let i = 0;
                      i < Math.max(numA.length, numB.length);
                      i++
                    ) {
                      const partA = numA[i] || 0;
                      const partB = numB[i] || 0;

                      if (partA !== partB) {
                        return partA - partB;
                      }
                    }
                  } catch (error) {
                    console.error("Erro ao comparar números:", error);
                  }

                  return 0;
                }),
            };
          });

        setItems(itemsWithSubitems);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getOrcamento, id, obras, token]);

  useEffect(() => {
    if (!orcamento && id) {
      changeLoading(true, "Buscando dados orcamento...");

      void getInitialOrcamento();
      void getData();

      const timeout = setTimeout(() => {
        changeLoading(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [changeLoading, getData, getInitialOrcamento, orcamento]);

  useEffect(() => {
    void getData();
  }, [getData]);

  return {
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
  };
};

export default useOrcamentos;
