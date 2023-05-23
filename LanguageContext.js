import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const translateText = async (text) => {
    if (language==="fr") {
      
      const url = "https://api.mymemory.translated.net/get?q="+text+"&langpair=en|fr";

      const res = await fetch(url);
      const data = await res.json();
      const textTranslated = data.matches[0]?.translation.toString();
      console.log("++++++++"  + textTranslated );
      return textTranslated ;
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};
