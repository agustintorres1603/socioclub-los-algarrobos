import { createContext, useState } from 'react';

// Contexto con el socio que ingresó con su DNI.
// Cualquier componente lo lee con useContext(SocioContext), sin pasarlo por props.
export const SocioContext = createContext(null);

export function SocioProvider({ children }) {
  const [socio, setSocio] = useState(null);

  function iniciarSesion(socioEncontrado) {
    setSocio(socioEncontrado);
  }

  function cerrarSesion() {
    setSocio(null);
  }

  return (
    <SocioContext.Provider value={{ socio, iniciarSesion, cerrarSesion }}>
      {children}
    </SocioContext.Provider>
  );
}
