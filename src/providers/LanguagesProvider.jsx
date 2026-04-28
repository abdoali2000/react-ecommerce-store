import React, { useState } from 'react'
import { LanguagesContext } from '../context/languageContext'

function LanguagesProvider({children}) {
    const [language, setLanguage] = useState("en");
  return (
   <LanguagesContext.Provider value={{language, setLanguage}}>
    {children}
   </LanguagesContext.Provider>
  )
}

export default LanguagesProvider