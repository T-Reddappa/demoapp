import React, { useContext, useEffect } from "react";
import "./detailedMail.css";
import { EmailContext } from "../../context/EmailContext";

const DetailedMail = ({ mailBody }) => {
  const { getEmailBody, selectedMail } = useContext(EmailContext);

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
      console.log(response, "resp");
    };
    fetchEmailBody();
  }, [selectedMail]);
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

        <div className="body">{mailBody ? mailBody : "nomai"}</div>
      </div>
    </div>
  );
};

export default DetailedMail;
