import React from "react";
import "../styles/mailList.css";

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save Time, Save Money!</h1>
      <span className="mailDesc">
        Sign up and we'll send you the best deals!
      </span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your mail" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
