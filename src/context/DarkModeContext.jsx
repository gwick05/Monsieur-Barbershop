import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeContextProvider({ children }) {
  const [dark, setDark] = useState();
  useEffect(() => {
    const darkMode = localStorage.getItem('dark');
    if (darkMode) setDark(JSON.parse(darkMode));
    else setDark(false);
  }, []);

  useEffect(() => {
    if (dark !== undefined) {
      localStorage.setItem('dark', JSON.stringify(dark));
    }
  }, [dark]);

  function toggleDark() {
    setDark((dark) => !dark);
  }

  //
  return (
    <DarkModeContext.Provider
      value={{
        dark,
        toggleDark,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error('Il context si trova al di fuori del provider');
  return context;
}

export { DarkModeContextProvider, useDarkModeContext };
