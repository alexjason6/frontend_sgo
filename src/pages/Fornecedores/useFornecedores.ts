import React, { useContext, useEffect, useState } from "react";

import FornecedoresContext from "../../contexts/fornecedoresContext";
import ModalContext from "../../contexts/modalContext";
import AuthContext from "../../contexts/authContext";
import LoadingContext from "../../contexts/loadingContext";

const useFornecedores = () => {
  const { fornecedores, listFornecedores } = useContext(FornecedoresContext);
  const { token } = useContext(AuthContext);
  const { changeLoading } = useContext(LoadingContext);
  const { changeModal } = useContext(ModalContext);

  const [fornecedoresData, setFornecedoresData] = useState(fornecedores);

  const fornecedoresLength = fornecedores.length;

  const getFornecedores = async () => {
    await listFornecedores({ token });

    changeLoading(false);
  };

  const sortFornecedores = (orderBy: string, direction: string) => {
    if (orderBy === "name") {
      const data = [...fornecedores].sort((a, b) =>
        a.nome > b.nome && direction === "ASC" ? 1 : -1
      );

      setFornecedoresData(data);
    }
  };

  useEffect(() => {
    changeLoading(true, "Buscando fornecedores...");
    if (!fornecedores || fornecedores.length === 0) {
      void getFornecedores();
    }

    const timeout = setTimeout(() => {
      sortFornecedores("name", "ASC");
      changeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return {
    fornecedoresData,
    fornecedoresLength,
    changeModal,
    sortFornecedores,
  };
};

export default useFornecedores;
