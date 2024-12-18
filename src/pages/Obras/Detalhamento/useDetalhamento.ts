import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";

import RdoRdaContext from "../../../contexts/rdoRdaContext";
import AuthContext from "../../../contexts/authContext";
import FornecedoresContext from "../../../contexts/fornecedoresContext";
import ObrasContext from "../../../contexts/obrasContext";
import OrcamentosContext from "../../../contexts/orcamentosContext";
import LoadingContext from "../../../contexts/loadingContext";
import EtapasContext from "../../../contexts/etapasContext";

import {
  calculaPerCentValue,
  comprometidoValue,
  executadoValue,
  orcamentoValue,
  saldoValue,
} from "../../../utils/calculateInfosObras";

const useDetalhamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { token } = useContext(AuthContext);
  const { cliente, clienteId } = location.state;
  const { changeLoading } = useContext(LoadingContext);
  const { obras, listObras } = useContext(ObrasContext);
  const { lancamentosRdo, lancamentosRda, rdos, rdas } =
    useContext(RdoRdaContext);
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext);
  const { orcamentos } = useContext(OrcamentosContext);
  const { etapas, subetapas } = useContext(EtapasContext);
  const [obra] = obras.filter((item) => item.id === Number(id));

  const currentRdo = rdos.find((rdo) => rdo.obra === obra?.id);
  const currentRda = rdas.find((rda) => rda.obra === obra?.id);
  const [animate, setAnimate] = useState(false);

  const [orcamentoOpened] = orcamentos.filter(
    (orcamento) => orcamento.obra === obra.id
  );
  const lancamentos = lancamentosRdo.filter(
    (lancamento) => lancamento.rdo === currentRdo?.id
  );
  const itens = orcamentoOpened.item;

  const bigestPayments = useMemo(
    () =>
      lancamentosRdo
        .sort((a, b) =>
          Number(a.valor_pagamento) > Number(b.valor_pagamento) ? -1 : 1
        )
        .slice(0, 5),
    [lancamentosRdo]
  );
  const comprometidoPayments = useMemo(
    () =>
      lancamentosRdo
        .sort((a, b) =>
          Number(a.valor_comprometido) > Number(b.valor_comprometido) ? -1 : 1
        )
        .slice(0, 8),
    [lancamentosRdo]
  );
  const trataInicio = moment.unix(Number(obra?.data_inicio));
  const inicio = moment(trataInicio, "YYYY-MM-DD").diff(
    moment().format("YYYY-MM-DD"),
    "months"
  );

  const sizeExecutado = Number(
    calculaPerCentValue(
      executadoValue(lancamentos, "pure"),
      orcamentoValue(itens, "pure")
    )
  );

  const sizeComprometido = Number(
    calculaPerCentValue(
      comprometidoValue(lancamentos, "pure"),
      orcamentoValue(itens, "pure")
    )
  );

  const sizeSaldo = Number(
    String(
      calculaPerCentValue(
        saldoValue(itens, lancamentos, "pure"),
        orcamentoValue(itens, "pure")
      )
    ).split(",")[0]
  );

  const mediaGastosRDO = (days: number) => {
    const lastLancamentos = lancamentosRdo
      .sort((a, b) => (a.data_pagamento > b.data_pagamento ? 1 : -1))
      .slice(0, days);
    const value =
      lastLancamentos.reduce<number>((accumulator, item) => {
        return accumulator + Number(item.valor_pagamento);
      }, 0) / days;

    if (value === Infinity || isNaN(value)) {
      return 0;
    }

    return lastLancamentos.length === 0 ? 0 : value;
  };

  const verificaOpacidade = (index: number, arrayLength: number) => {
    if (arrayLength <= 1) {
      return 1;
    }

    const minOpacity = 0.1;
    const maxOpacity = 1;

    return maxOpacity - ((maxOpacity - minOpacity) * index) / (arrayLength - 1);
  };

  const handleOpenLancamentoRDORDA = (type: string, id?: number) => {
    if (!type || !id) {
      return;
    }

    changeLoading(true, `carregando dados do ${type}...`);

    navigate(`/obras/lancamentos/${type}/${id}`, {
      state: {
        cliente,
        clienteId,
        obra: obra.id,
      },
    });
  };

  const getData = useCallback(async () => {
    changeLoading(true, "Buscando fornecedores...");
    await listFornecedores({ token });

    changeLoading(true, "Buscando dados da obra...");
    await listObras({ token });
  }, [listObras, token, changeLoading, listFornecedores]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    changeLoading(true, "Buscando dados...");
    if (!obras || obras.length === 0) {
      void getData();
    }

    const timeout = setTimeout(() => {
      changeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [changeLoading, getData, obras]);

  return {
    obra,
    cliente,
    animate,
    itens,
    lancamentosRdo,
    lancamentos,
    sizeExecutado,
    sizeComprometido,
    sizeSaldo,
    comprometidoPayments,
    rdos,
    rdas,
    currentRda,
    bigestPayments,
    fornecedores,
    inicio,
    currentRdo,
    lancamentosRda,
    etapas,
    subetapas,
    mediaGastosRDO,
    verificaOpacidade,
    handleOpenLancamentoRDORDA,
  };
};

export default useDetalhamento;
