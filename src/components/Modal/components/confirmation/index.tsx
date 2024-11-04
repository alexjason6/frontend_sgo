import React, { useContext } from "react";
import Button from "../../../Button";
import ModalContext from "../../../../contexts/modalContext";

interface PropsConfirmation {
  confirmation: () => void,
  message: string
}

const Confirmation: React.FC<PropsConfirmation> = ({confirmation, message}) => {
  const { changeModalConfirmacao } = useContext(ModalContext)

  const handleConfirmation = () => {
    confirmation()
    changeModalConfirmacao()
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '30%', backgroundColor: '#ffffff', borderRadius: 4, padding: 20, marginTop: '15%', marginLeft: 'auto', marginRight: 'auto'}}>
      <h2 style={{fontSize: 16, color: '#444444', fontWeight: 200}}>{message}</h2>
      <div style={{display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end', gap: 20, marginTop: 30, marginBottom: -20}}>
        <Button onClick={() => changeModalConfirmacao()}>Cancelar</Button>
        <Button $danger onClick={handleConfirmation}>Confirmar</Button>
      </div>
    </div>
  )
}

export default Confirmation
