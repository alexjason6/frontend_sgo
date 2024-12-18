import { useEffect, useCallback, useContext, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import RdoRdaServices from "../../../../services/sgo/RdoRdaServices";
import RdoRdaMapper from "../../../../services/mappers/RdoRdaMapper";

import RdoRdaContext from "../../../../contexts/rdoRdaContext";
import ClientesContext from "../../../../contexts/clientesContext";
import OrcamentosContext from "../../../../contexts/orcamentosContext";
import EtapasContext from "../../../../contexts/etapasContext";
import FornecedoresContext from "../../../../contexts/fornecedoresContext";
import AuthContext from "../../../../contexts/authContext";
import LoadingContext from "../../../../contexts/loadingContext";

import { currencyFormat } from "../../../../utils/currencyFormat";
import Toast from "../../../../utils/toast";
import dateFormat from "../../../../utils/dateFormat";

import { LancamentoRdoRda } from "../../../../interfaces/globalInterfaces";

interface Props {
  tipo?: string;
  rdoRda?: string;
  nameCliente?: string;
  obraId?: number;
  cliente_id?: number;
  lancamento?: LancamentoRdoRda;
}

const useLancamentos = ({
  tipo,
  rdoRda,
  nameCliente,
  obraId,
  cliente_id,
}: Props) => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { obra, clienteId, cliente } = useLocation().state;
  const { changeLoading } = useContext(LoadingContext);
  const { token, user } = useContext(AuthContext);
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext);
  const { listEtapas, listSubetapas } = useContext(EtapasContext);
  const { orcamentos, listOrcamentos } = useContext(OrcamentosContext);
  const { listClientes } = useContext(ClientesContext);
  const { lancamentosRdo, listRdos } = useContext(RdoRdaContext);
  const typeDocument = tipo?.toUpperCase() ?? type?.toUpperCase();
  const [dataLancamento, setDataLancamento] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [nf, setNf] = useState<string>();
  const [dataNf, setDataNf] = useState<string>("");
  const [valorComprometido, setValorComprometido] = useState<string>();
  const [fornecedor, setFornecedor] = useState<number>();
  const [contratoExists, setContratoExists] = useState<number>(0);
  const [contrato, setContrato] = useState<number>();
  const [observacao, setObservacao] = useState<string>("");
  const [orcamentoSelected] = orcamentos.filter(
    (item) =>
      Number(item.obra) === Number(obra) || Number(item.obra === Number(obraId))
  );

  const handleSubmitLancamento = async (
    itens: any,
    parcelas: any,
    parcelamento: boolean,
    dataVencimento: string,
    descricao: string
  ) => {
    try {
      changeLoading(true, "Iniciando lançamentos...");

      const [fornecedorSelecionado] = fornecedores.filter(
        (item) => item.id === fornecedor
      );
      const { banco, agencia, conta, tipo_conta, pix } = fornecedorSelecionado;
      let parcelaAtual = 1;

      for (const item of itens) {
        for (const parcela of parcelas) {
          const infos = {
            rdo: Number(rdoRda) || Number(id),
            dataLancamento: String(moment(dataLancamento).unix()),
            nf,
            dataNf: String(moment(dataNf).unix()),
            valorComprometido: contratoExists ? String(item.valor) : undefined,
            valorPagamento: !contratoExists
              ? String(item.valor)
              : !contratoExists && parcelamento
              ? parcela.valor
              : "",
            dataPagamento: String(moment(dataVencimento).unix()),
            usuario: user?.id,
            observacao,
            descricao: item.descricaoEtapa,
            parcela: `${parcelaAtual} de ${parcelas}`,
            obra: obra || obraId,
            situacao: 1,
            banco,
            agencia,
            conta,
            tipo_conta,
            pix,
            etapa: Number(item.etapa), // Atribuímos o valor correto da etapa
            subetapa: Number(item.subetapa), // Atribuímos o valor correto da subetapa
            fornecedor,
            boletos: [],
            cliente: clienteId || cliente.id || cliente_id,
            status: 1,
          };

          parcelaAtual += 1; // Incrementa a parcela para o próximo item

          try {
            changeLoading(
              true,
              `Enviando dados do lancamento ${item.etapa}...`
            );

            const mapperLancamento = RdoRdaMapper.toPersistence(infos);
            const create = await RdoRdaServices.createLancamentoRdoRda({
              token,
              mapperLancamento,
              type,
            });

            if (create.id) {
              Toast({
                type: "success",
                text: `Lançamento cadastrado com sucesso.`,
                duration: 5000,
              });
            }
          } catch (error) {
            console.error(
              `Erro ao criar/atualizar lançamento da etapa ${item.etapa}:`,
              error
            );
            Toast({
              type: "danger",
              text: `Erro ao criar/atualizar lançamento da etapa ${item.etapa}.`,
              duration: 5000,
            });
          }
        }
      }
    } catch (error) {
      console.error("Erro ao realizar o lançamento:", error);
      Toast({
        type: "danger",
        text: "Erro ao realizar os lançamentos.",
        duration: 5000,
      });
    } finally {
      changeLoading(false);
      listRdos({ token });
      navigate(-1); // Navega de volta após os lançamentos
    }
  };

  const handleChangeFornecedor = (value: string) => {
    setFornecedor(Number(value));
  };

  const getData = useCallback(async () => {
    await listFornecedores({ token });

    await listClientes({ token });

    await listOrcamentos({ token });

    await listEtapas({ token });

    await listSubetapas({ token });
  }, [
    listClientes,
    listFornecedores,
    listOrcamentos,
    listEtapas,
    listSubetapas,
    token,
  ]);

  useEffect(() => {
    void getData();
  }, [getData]);

  return {
    cliente,
    typeDocument,
    fornecedor,
    orcamentoSelected,
    fornecedores,
    contratoExists,
    contrato,
    lancamentosRdo,
    dataLancamento,
    dataNf,
    observacao,
    valorComprometido,
    nf,
    setNf,
    setValorComprometido,
    handleChangeFornecedor,
    setContratoExists,
    setContrato,
    setDataLancamento,
    setDataNf,
    setObservacao,
    dateFormat,
    currencyFormat,
    handleSubmitLancamento,
  };
};

export default useLancamentos;
