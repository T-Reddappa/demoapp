import React, { useContext, useEffect, useState } from "react";
import "./detailedMail.css";
import { EmailContext } from "../../context/EmailContext";

const DetailedMail = () => {
  const { getEmailBody, selectedMail } = useContext(EmailContext);
  const [mailBody, setMailBody] = useState("");

  const date = new Date(selectedMail?.date);

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

  useEffect(() => {
    const fetchEmailBody = async () => {
      const response = await getEmailBody(selectedMail.id);
      const body = response.replace("<div>", "").replace("</div>", "");

      setMailBody(body);
    };
    fetchEmailBody();
  }, [selectedMail]);

  const textToDisplay = mailBody?.split("</p>");
  console.log(textToDisplay);

  return (
    <div className="detailed-mail-box">
      <div className="sender-initial">
        {selectedMail?.from.name.slice(0, 1).toUpperCase()}
      </div>
      <div className="body-container">
        <div className="subject">
          <div className="info">
            <p className="sub"> {selectedMail?.subject}</p>
            <p>{formattedDateTime}</p>
          </div>
          <button className="favorite-btn">Mark as favorite</button>
        </div>

        <div className="mail-body">
          {textToDisplay?.map((para) => (
            <p>{para.replace("<p>", "")}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedMail;
