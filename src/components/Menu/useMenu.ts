import React, { useState, useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import AuthContext from "../../contexts/authContext";

import { type TypesItemActive } from "../../interfaces/globalInterfaces";

const useMenu = () => {
  const { pathname } = useLocation();
  const { signOut } = useContext(AuthContext);

  const [itemActive, setItemActive] = useState<TypesItemActive>({
    name: pathname,
  });
  const [submenuActive, setSubmenuActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectItem = useCallback((item: string) => {
    setOpen(false);
    setItemActive((prevState) =>
      prevState.name === item ? { name: "" } : { name: item }
    );
  }, []);

  const handleMouseEnter = (item: string) => {
    setSubmenuActive(item);
  };

  const handleChangeMenu = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  const handleMouseLeave = () => {
    setSubmenuActive(null);
  };
  useEffect(() => {
    if (open) {
      const closeOnEscapeKey = (e: { key: string }) =>
        e.key === "Escape" ? handleChangeMenu() : null;
      document.body.addEventListener("keydown", closeOnEscapeKey);

      return () => {
        document.body.removeEventListener("keydown", closeOnEscapeKey);
      };
    }
  }, [handleChangeMenu, open]);

  return {
    itemActive,
    submenuActive,
    open,
    handleChangeMenu,
    signOut,
    handleSelectItem,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useMenu;
