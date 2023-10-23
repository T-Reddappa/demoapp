import "./App.css";
import React, { useContext } from "react";
import { EmailContext } from "./context/EmailContext";
import DetailedMail from "./components/detailedMail/DetailedMail";
import Mail from "./components/mail/Mail";

function App() {
  const { emails, isSplit } = useContext(EmailContext);
  return (
    <div className="App">
      <div className="home-container">
        <div className="mail-list">
          {emails?.map((mail) => (
            <Mail mail={mail} />
          ))}
        </div>
        {isSplit && (
          <div className="mail-bodyy">
            <DetailedMail />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
