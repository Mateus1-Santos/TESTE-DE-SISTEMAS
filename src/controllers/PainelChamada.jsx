import { useState } from 'react'

export default function PainelChamada({ onFecharChamada }) {
  const [presentes, setPresentes] = useState(0)

  return (
    <div>
      <div>Presentes: {presentes}</div>
      <button type="button" onClick={() => setPresentes(presentes + 1)}>
        Marcar presença
      </button>
      <button type="button" onClick={() => onFecharChamada?.(presentes)}>
        Fechar chamada
      </button>
    </div>
  )
}
