import React, { useState, ChangeEvent, useContext } from "react";

import EtapasContext from "../../../../contexts/etapasContext";

import useErrors from "../../../../hooks/useErrors";

interface Subitem {
  id: number;
  nome: string;
  unidade: string;
  numero: string;
  etapa: number;
  idSubetapa: number;
  quantidade: string;
  valor: string;
  fornecedor: string;
  valorTotal: string;
}

const useItems = () => {
  const { etapas } = useContext(EtapasContext);
  const { setError, removeError } = useErrors();

  const [items, setItems] = useState([
    {
      id: Math.random(),
      nome: "",
      valorTotal: "",
      numero: "",
      idEtapa: 0,
      subetapas: [
        {
          id: Math.random(),
          nome: "",
          unidade: "",
          numero: "",
          etapa: 0,
          idSubetapa: 0,
          quantidade: "",
          valor: "",
          valorTotal: "",
          fornecedor: "",
        },
      ],
    },
  ]);

  const handleAddEtapa = () => {
    setItems((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        nome: "",
        valorTotal: "",
        idEtapa: 1,
        numero: "",
        subetapas: [
          {
            id: Math.random(),
            nome: "",
            unidade: "",
            numero: "",
            etapa: 0,
            idSubetapa: 0,
            quantidade: "",
            valor: "",
            fornecedor: "",
            valorTotal: "",
          },
        ],
      },
    ]);
  };

  const calculateSubitemTotal = (valor: string, quantidade: string) => {
    return (
      parseFloat(valor.replace(",", ".")) * parseFloat(quantidade)
    ).toFixed(2);
  };

  const calculateEtapaTotal = (subetapas: Subitem[]) => {
    return subetapas
      .reduce((acc, subetapa) => acc + Number(subetapa.valorTotal || "0"), 0)
      .toFixed(2);
  };

  const handleRemoveEtapa = (etapaId: number) => {
    if (items.length <= 1) return;
    setItems((prevState) => prevState.filter((etapa) => etapa.id !== etapaId));
  };

  const handleAddSubetapa = (etapaId: number) => {
    setItems((prevState) =>
      prevState.map((etapa) =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subetapas: [
                ...etapa.subetapas,
                {
                  id: Math.random(),
                  nome: "",
                  unidade: "",
                  numero: "",
                  quantidade: "",
                  idSubetapa: 0,
                  etapa: 0,
                  valor: "",
                  fornecedor: "",
                  valorTotal: "",
                },
              ],
            }
          : etapa
      )
    );
  };

  const handleRemoveSubitem = (etapaId: number, subetapaId: number) => {
    setItems((prevState) =>
      prevState.map((etapa) =>
        etapa.id === etapaId
          ? {
              ...etapa,
              subetapas: etapa.subetapas.filter(
                (subetapa) => subetapa.id !== subetapaId
              ),
            }
          : etapa
      )
    );
  };

  const updateSubitem = (
    etapaId: number,
    subetapaId: number,
    updates: Partial<Subitem>
  ) => {
    setItems((prevItems) =>
      prevItems.map((etapa) => {
        if (etapa.id === etapaId) {
          const updatedSubetapas = etapa.subetapas.map((subetapa) => {
            if (subetapa.id === subetapaId) {
              const updatedSubetapa = { ...subetapa, ...updates };
              const valorTotal = calculateSubitemTotal(
                updatedSubetapa.valor || "0",
                updatedSubetapa.quantidade || "0"
              );
              return { ...updatedSubetapa, valorTotal: valorTotal || "0" };
            }
            return subetapa;
          });

          const etapaTotal = calculateEtapaTotal(updatedSubetapas);

          return {
            ...etapa,
            subetapas: updatedSubetapas,
            valorTotal: etapaTotal,
          };
        }
        return etapa;
      })
    );
  };

  const handleChangeItem = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    fieldName: string,
    message: string,
    etapaId?: number
  ) => {
    const value = event.target.value;

    if (fieldName === "etapa" && value !== "0" && etapaId) {
      const etapaSelecionada = etapas?.find(
        (etapa) => etapa.id === Number(value)
      );

      if (etapaSelecionada) {
        setItems((prevState) =>
          prevState.map((item) =>
            item.id === etapaId
              ? {
                  ...item,
                  nome: etapaSelecionada.nome,
                  idEtapa: Number(value),
                  id: etapaSelecionada.id,
                }
              : item
          )
        );
      }
    }

    if (fieldName === "numEtapa") {
      setItems((prevState) =>
        prevState.map((item) =>
          item.id === etapaId ? { ...item, numero: value } : item
        )
      );
    }

    if (!value) {
      setError({ field: fieldName, message });
    } else {
      removeError(fieldName);
    }
  };

  return {
    items,
    handleAddEtapa,
    handleRemoveEtapa,
    handleAddSubetapa,
    handleRemoveSubitem,
    handleChangeItem,
    updateSubitem,
    setItems,
  };
};

export default useItems;
