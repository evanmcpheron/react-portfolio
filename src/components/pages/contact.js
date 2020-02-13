import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "../forms/contact-form";
// import contactPagePicture from "../../../static/assets/images/login.jpg";

export default function() {
  return (
    <div className="content-page-wrapper contact-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(../../../static/assets/img/login.jpg) no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column"> 
        <ContactForm/> 
      </div>
    </div>
  );
}