import moment from "moment";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const useItems = () => {
  /*   const [groupItems, setGroupItems] = useState([
    { id: Math.random(), etapa: 0 },
  ]); */
  const [parcelas, setParcelas] = useState<
    Array<{ id: number; vencimento: string; valor: string }>
  >([{ id: 1, vencimento: "", valor: "" }]);
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [diasVencimento, setDiasVencimento] = useState<number>(0);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [parcelamento, setParcelamento] = useState<boolean>(false);
  const [dataVencimento, setDataVencimento] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [itens, setItens] = useState<
    Array<{
      id: number;
      etapa: number | null;
      subetapa: number | null;
      valor: string;
      descricao: string;
    }>
  >([
    {
      id: Math.random(),
      etapa: 0,
      subetapa: null,
      valor: "",
      descricao: "",
    },
  ]);

  const handleAddItem = () => {
    const newId = Math.random();
    //setGroupItems((prevstate) => [...prevstate, { id: newId, etapa: 0 }]);
    setItens((prevstate) => [
      ...prevstate,
      { id: newId, etapa: 0, subetapa: null, valor: "", descricao: "" },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    if (itens.length === 1) return;

    setItens((prevstate) => prevstate.filter((item) => item.id !== id));
  };

  const calculaDataParcelas = (parcela: number) => {
    const days = parcela * diasVencimento;
    const date = moment(dataVencimento).add(days, "days").format("YYYY-MM-DD");

    return date;
  };

  const handleChangeItemAndParcelaPrice = (
    id: number,
    field: string,
    value: string,
    setItem: Dispatch<SetStateAction<any[]>>
  ) => {
    const cleanedValue = value.replace(/\D/g, "");

    let integerPart = cleanedValue.slice(0, -2);
    let decimalPart = cleanedValue.slice(-2);

    if (decimalPart.length > 2) {
      integerPart += decimalPart.slice(0, -2);
      decimalPart = decimalPart.slice(-2);
    }

    const formattedValue =
      integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + decimalPart;

    const trataValue =
      field === "valor"
        ? formattedValue
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
        : value;

    if (field === "etapa") {
      setItem((prevstate) =>
        prevstate.map((item) =>
          Number(item.id) === Number(id)
            ? { ...item, etapa: Number(value) }
            : item
        )
      );

      /*       const [groupItemExists] = groupItems.filter(
        (item) => Number(item.id) === Number(value)
      );
      const addEtapa = Object.assign(groupItemExists, { etapa: trataValue });

      setGroupItems((prevstate) => {
        const removeDuplicate = prevstate.filter((item) => item.id !== id);
        return [...removeDuplicate, addEtapa];
      }); */
    }

    if (field === "descricaoEtapa") {
      setItem((prevstate) =>
        prevstate.map((item) =>
          Number(item.id) === Number(value)
            ? { ...item, descricao: value }
            : item
        )
      );
    }

    setItem((prevstate) =>
      prevstate.map((item) => {
        return Number(item.id) === Number(id)
          ? {
              ...item,
              [field]:
                field === "vencimento" ? calculaDataParcelas(id) : trataValue,
            }
          : item;
      })
    );
  };

  const handleNumeroParcelasChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value, 10) || 1;
    setNumeroParcelas(numero);

    const novasParcelas = Array.from({ length: numero }, (_, i) => ({
      id: i + 1,
      vencimento: "",
      valor: "",
    }));

    setParcelas(novasParcelas);
  };

  const handleChangeParcelamento = () => {
    setParcelamento(!parcelamento);
  };

  const handleChangeDataVencimento = (value: string) => {
    setDiasVencimento(Number(value));

    if (Number(value) === 0) {
      const today = moment().format("YYYY-MM-DD");
      setDataVencimento(today);
    } else {
      const date = moment().add(Number(value), "days").format("YYYY-MM-DD");

      setDataVencimento(date);
    }
  };

  useEffect(() => {
    const totalLancamentoValue = itens.reduce<number>(
      (acc, item) => acc + Number(item.valor),
      0
    );

    setValorTotal(totalLancamentoValue);
  }, [itens]);

  return {
    parcelas,
    diasVencimento,
    dataVencimento,
    numeroParcelas,
    valorTotal,
    itens,
    descricaoItem,
    parcelamento,
    handleChangeParcelamento,
    setDescricaoItem,
    setItens,
    setValorTotal,
    setNumeroParcelas,
    setDataVencimento,
    setDiasVencimento,
    setParcelas,
    calculaDataParcelas,
    handleAddItem,
    handleRemoveItem,
    handleChangeItemAndParcelaPrice,
    handleChangeDataVencimento,
    handleNumeroParcelasChange,
  };
};

export default useItems;
