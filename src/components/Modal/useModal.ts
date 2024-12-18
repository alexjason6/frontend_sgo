import React, { useContext, useEffect } from "react";

import ModalContext from "../../contexts/modalContext";

const useModal = () => {
  const { changeModal } = useContext(ModalContext);

  useEffect(() => {
    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === "Escape" ? changeModal() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    document.body.classList.add("no-scroll");

    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
      document.body.classList.remove("no-scroll");
    };
  }, [changeModal]);

  return { changeModal };
};

export default useModal;
