import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactForm from "../forms/contact-form";
import ReactGA from 'react-ga';


ReactGA.initialize('UA-80246531-2');

ReactGA.pageview('/Contact');

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