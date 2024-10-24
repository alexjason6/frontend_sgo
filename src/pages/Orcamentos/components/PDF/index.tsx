import React, {forwardRef} from "react";

interface Orcamento {
  orcamento: any
}

const OrcamentoPdf: React.FC<Orcamento> = ({orcamento}) => {

  return (
    <div>
      <p>Teste</p>
      <p>{orcamento?.nome}</p>
    </div>
  )

}


export default OrcamentoPdf
