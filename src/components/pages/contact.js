import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import contactPagePicture from "../../../static/assets/images/login.jpg";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div
        className="left-column"
        style={{
          background: "url(../../../static/assets/img/login.jpg) no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
        <div className="contact-bullet-points">

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="envelope" />
            </div>

            <div className="text">evan@emcpheron.com</div>
          </div>

          <div className="bullet-point-group">
            <div className="icon">
              <FontAwesomeIcon icon="map-marked-alt" />
            </div>

            <div className="text">Las Vegas, NV</div>
          </div>
        </div>
      </div>
    </div>
  );
}