import React, { useContext } from "react";
import "./mail.css";
import { EmailContext } from "../../context/EmailContext";

const Mail = ({ mail }) => {
  const { isSplit, setIsSplit, selectedMail, setSelectedMail } =
    useContext(EmailContext);
  const date = new Date(mail.date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };

  const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
    date
  );

  return (
    <div
      className="mail-box"
      onClick={() => {
        setIsSplit(!isSplit);
        setSelectedMail(mail);
      }}
    >
      <div className="sender-initial">
        {mail.from.name.slice(0, 1).toUpperCase()}
      </div>
      <div className="mail-details">
        <p className="sender">
          From:{" "}
          <span>
            {mail.from.name} {"<"}
            {mail.from.email}
            {">"}
          </span>
        </p>
        <p>
          Subject: <span className="subject"> {mail.subject}</span>
        </p>
        <p className="description">{mail.short_description}</p>
        <div className="date">{formattedDateTime}</div>
      </div>
    </div>
  );
};

export default Mail;
