import React, { createContext, useEffect, useState } from "react";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [selectedMail, setSelectedMail] = useState();
  const [isSplit, setIsSplit] = useState(false);

  const getEmails = async () => {
    try {
      const response = await fetch("https://flipkart-email-mock.now.sh/");
      const data = await response.json();
      setEmails(data.list);
    } catch (e) {
      console.log(e);
    }
  };

  const getEmailBody = async (mailId) => {
    try {
      const response = await fetch(
        `https://flipkart-email-mock.now.sh/?id=${mailId}`
      );
      const data = await response.json();
      return data.body;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <EmailContext.Provider
      value={{
        getEmails,
        emails,
        getEmailBody,
        isSplit,
        setIsSplit,
        selectedMail,
        setSelectedMail,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
